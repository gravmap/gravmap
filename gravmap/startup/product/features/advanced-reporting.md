# Advanced Reporting Feature Specification

**Feature ID:** FEA-004
**Priority:** P1 (High)
**Status:** Planned
**Owner:** Product Team

---

## Overview

Provide comprehensive analytics and reporting capabilities that give agents insights into their transaction volume, deadline compliance, time-to-close, and business performance.

### Problem Statement

Real estate agents currently have no way to analyze their transaction patterns. They don't know:
- How many deals they close per month/quarter
- Their average time to close
- Which deadlines they frequently miss
- Their busiest periods
- How their performance compares to past periods

### Proposed Solution

Build a robust reporting dashboard with:
1. Transaction volume and trends
2. Deadline compliance metrics
3. Pipeline analytics
4. Performance comparisons
5. Exportable reports (PDF, CSV)
6. Scheduled report delivery via email

---

## User Stories

### US-1: Transaction Volume Dashboard
**As a** Pro subscriber
**I want to** see my transaction volume over time
**So that** I understand my business trends

**Acceptance Criteria:**
- [ ] Line chart showing transactions by month/quarter/year
- [ ] Filter by transaction type (buy, sell, lease)
- [ ] Compare to previous period (MoM, YoY)
- [ ] Show transaction count and value
- [ ] Hover for detailed breakdown

### US-2: Deadline Compliance Report
**As a** an agent
**I want to** see my deadline completion rate
**So that** I know where to improve

**Acceptance Criteria:**
- [ ] Overall compliance percentage
- [ ] Breakdown by deadline type
- [ ] Missed vs completed vs pending
- [ ] Average days early/late for completions
- [ ] Trend over time (improving/worsening)

### US-3: Pipeline Analytics
**As a** user
**I want to** see my active pipeline status
**So that** I can forecast revenue

**Acceptance Criteria:**
- [ ] Active transactions by stage
- [ ] Total pipeline value
- [ ] Expected close dates distribution
- [ ] Days in each stage average
- [ ] Stalled transaction alerts

### US-4: Transaction Details Report
**As a** a user
**I want to** drill into individual transaction metrics
**So that** I understand what's happening

**Acceptance Criteria:**
- [ ] Per-transaction summary
- [ ] All deadlines with completion dates
- [ ] Documents uploaded count
- [ ] Days from start to close
- [ ] Notes and activities timeline

### US-5: Comparative Analysis
**As a** power user
**I want to** compare my performance across time periods
**So that** I track my improvement

**Acceptance Criteria:**
- [ ] Side-by-side period comparison
- [ ] Highlight significant changes
- [ ] Visual diff charts
- [ ] Key metrics comparison table
- [ ] Percentage change indicators

### US-6: Export Reports
**As a** user
**I want to** export my reports
**So that** I can share with my broker or team

**Acceptance Criteria:**
- [ ] Export to PDF (formatted report)
- [ ] Export to CSV (raw data)
- [ ] Include date range in export
- [ ] Company logo customization
- [ ] Email export option

### US-7: Scheduled Reports
**As a** busy agent
**I want to** receive reports automatically
**So that** I don't have to check manually

**Acceptance Criteria:**
- [ ] Schedule daily/weekly/monthly reports
- [ ] Choose report type(s) to include
- [ ] Set delivery time
- [ ] Multiple recipients
- [ ] Manage scheduled reports in settings

---

## Technical Approach

### Database Schema

```sql
-- Report configurations
CREATE TABLE report_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name VARCHAR(255) NOT NULL,
  report_type VARCHAR(50) NOT NULL,
  filters JSONB DEFAULT '{}',
  schedule JSONB, -- { frequency, time, dayOfWeek, recipients }
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Report snapshots (for caching and history)
CREATE TABLE report_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_id UUID REFERENCES report_configs,
  user_id UUID REFERENCES auth.users NOT NULL,
  report_type VARCHAR(50) NOT NULL,
  date_range JSONB NOT NULL,
  data JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Metrics cache (refreshed daily)
CREATE TABLE metrics_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  metric_type VARCHAR(100) NOT NULL,
  period VARCHAR(20) NOT NULL, -- daily, weekly, monthly
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  value JSONB NOT NULL,
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, metric_type, period, period_start)
);
```

### API Endpoints

```typescript
// GET /api/reports/summary
// Get dashboard summary metrics
// Query params: startDate, endDate, timezone

// GET /api/reports/transactions
// Transaction volume report
// Query params: startDate, endDate, groupBy (day/week/month)

// GET /api/reports/deadlines
// Deadline compliance report
// Query params: startDate, endDate, deadlineType

// GET /api/reports/pipeline
// Pipeline analytics
// Query params: status (active/pending/closed)

// GET /api/reports/comparison
// Comparative analysis
// Query params: period1Start, period1End, period2Start, period2End

// POST /api/reports/export
// Export report
// Body: { reportType, format, dateRange, filters }

// GET /api/reports/scheduled
// List scheduled reports

// POST /api/reports/scheduled
// Create scheduled report

// DELETE /api/reports/scheduled/:id
// Delete scheduled report
```

### Report Generation Service

```typescript
// lib/reports/generator.ts
export class ReportGenerator {
  async generateTransactionVolume(
    userId: string,
    startDate: Date,
    endDate: Date,
    groupBy: 'day' | 'week' | 'month'
  ): Promise<TransactionVolumeReport> {
    const transactions = await this.getTransactions(userId, startDate, endDate);
    
    const grouped = this.groupByPeriod(transactions, groupBy);
    
    return {
      summary: {
        totalTransactions: transactions.length,
        totalValue: sumBy(transactions, 'value'),
        avgValue: meanBy(transactions, 'value')
      },
      data: grouped.map(group => ({
        period: group.period,
        count: group.transactions.length,
        value: sumBy(group.transactions, 'value'),
        byType: countBy(group.transactions, 'type')
      })),
      comparison: await this.getComparison(userId, startDate, endDate, groupBy)
    };
  }

  async generateDeadlineCompliance(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DeadlineComplianceReport> {
    const deadlines = await this.getDeadlines(userId, startDate, endDate);
    
    const completed = deadlines.filter(d => d.status === 'completed');
    const missed = deadlines.filter(d => d.status === 'missed');
    const pending = deadlines.filter(d => d.status === 'pending');
    
    const onTimeCompleted = completed.filter(d => 
      new Date(d.completedAt) <= new Date(d.dueDate)
    );
    
    return {
      summary: {
        total: deadlines.length,
        completed: completed.length,
        missed: missed.length,
        pending: pending.length,
        complianceRate: (onTimeCompleted.length / completed.length) * 100
      },
      byType: this.groupDeadlinesByType(deadlines),
      trend: await this.getComplianceTrend(userId, 12), // Last 12 months
      avgDaysEarly: this.calculateAvgDaysEarly(completed),
      avgDaysLate: this.calculateAvgDaysLate(completed)
    };
  }

  async generatePipelineReport(
    userId: string
  ): Promise<PipelineReport> {
    const transactions = await this.getActiveTransactions(userId);
    
    return {
      summary: {
        totalActive: transactions.length,
        totalValue: sumBy(transactions, 'value'),
        avgDaysInPipeline: this.calculateAvgDaysInPipeline(transactions)
      },
      byStage: this.groupByStage(transactions),
      expectedCloses: this.groupByExpectedCloseMonth(transactions),
      stalled: this.findStalledTransactions(transactions),
      forecast: this.generateForecast(transactions)
    };
  }
}
```

### Export Service

```typescript
// lib/reports/export.ts
import PDFDocument from 'pdfkit';
import { Parser } from 'json2csv';

export class ReportExporter {
  async exportToPdf(
    report: Report,
    options: PdfExportOptions
  ): Promise<Buffer> {
    const doc = new PDFDocument();
    
    // Header
    if (options.logo) {
      doc.image(options.logo, 50, 50, { width: 150 });
    }
    doc.fontSize(20).text(report.title, 50, 120);
    doc.fontSize(12).text(`Generated: ${new Date().toLocaleDateString()}`);
    
    // Summary
    doc.moveDown(2);
    doc.fontSize(14).text('Summary');
    this.renderSummaryTable(doc, report.summary);
    
    // Charts (as images)
    for (const chart of report.charts) {
      doc.addPage();
      doc.image(chart.image, 50, 50, { width: 500 });
    }
    
    // Data tables
    for (const table of report.tables) {
      doc.addPage();
      doc.fontSize(14).text(table.title);
      this.renderDataTable(doc, table);
    }
    
    return new Promise(resolve => {
      const chunks: Buffer[] = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.end();
    });
  }

  async exportToCsv(
    data: any[],
    fields: string[]
  ): Promise<string> {
    const parser = new Parser({ fields });
    return parser.parse(data);
  }
}
```

### Scheduled Reports Service

```typescript
// lib/reports/scheduler.ts
export class ReportScheduler {
  async processScheduledReports() {
    const dueReports = await this.getDueReports();
    
    for (const report of dueReports) {
      try {
        const data = await this.generateReport(report);
        const pdf = await this.exporter.exportToPdf(data, report.options);
        
        await this.emailService.sendReport({
          to: report.recipients,
          subject: `${report.name} - ${formatDate(new Date())}`,
          attachments: [{
            filename: `${report.name}.pdf`,
            content: pdf
          }]
        });
        
        await this.markReportSent(report.id);
      } catch (error) {
        await this.logReportError(report.id, error);
      }
    }
  }

  private async getDueReports(): Promise<ScheduledReport[]> {
    const now = new Date();
    
    return db.query(`
      SELECT * FROM report_configs
      WHERE schedule IS NOT NULL
      AND (
        (schedule->>'frequency' = 'daily' AND schedule->>'time' = $1)
        OR (schedule->>'frequency' = 'weekly' AND schedule->>'dayOfWeek' = $2 AND schedule->>'time' = $1)
        OR (schedule->>'frequency' = 'monthly' AND EXTRACT(DAY FROM NOW()) = 1 AND schedule->>'time' = $1)
      )
    `, [formatTime(now), now.getDay()]);
  }
}
```

---

## Report Types

### 1. Executive Summary Dashboard

Shows key metrics at a glance:
- Total transactions (this month/quarter)
- Deadline compliance rate
- Active pipeline value
- Documents processed
- Upcoming deadlines count

### 2. Transaction Volume Report

Metrics:
- Transaction count by period
- Transaction value by period
- Transaction type breakdown (buy/sell/lease)
- Year-over-year comparison
- Rolling 12-month trend

### 3. Deadline Compliance Report

Metrics:
- Overall compliance percentage
- By deadline type breakdown
- Average days early/late
- Most frequently missed deadlines
- Improvement trend

### 4. Pipeline Analytics

Metrics:
- Active transactions by stage
- Pipeline value distribution
- Expected close date timeline
- Days in pipeline average
- Stalled transaction alerts

### 5. Transaction Details

Metrics:
- Per-transaction timeline
- All deadlines with status
- Documents uploaded
- Notes/activities count
- Total days to close

### 6. Comparative Analysis

Metrics:
- Period-over-period comparison
- Percentage change in key metrics
- Visual comparison charts
- Highlighted outliers

---

## Dashboard Components

### Summary Cards
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Transactions   │ │   Compliance    │ │  Pipeline Value │
│     23 (+15%)   │ │     94% (+2%)   │ │    $4.2M (+8%)  │
│    This Month   │ │    This Quarter │ │    Active       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### Transaction Volume Chart
- Line chart: transactions over time
- Stacked by type (buy/sell/lease)
- Trend line
- Period comparison overlay

### Deadline Compliance Chart
- Gauge: overall compliance
- Bar chart: by deadline type
- Trend line: improvement over time

### Pipeline Distribution
- Funnel chart: transactions by stage
- Timeline: expected closes
- Alerts: stalled transactions

### Heatmap
- Transaction activity by day/time
- Deadline density by week
- Busiest periods identification

---

## Success Metrics

### Primary Metrics
- Report generation usage: > 60% of Pro users
- Exports per user per month: > 2
- Scheduled report adoption: > 20% of Pro users

### Secondary Metrics
- Time spent in reports: > 5 min/session
- Report data accuracy: > 99%
- Support tickets: < 2/week

### Tracking Events
```
report_viewed
report_generated
report_exported_pdf
report_exported_csv
report_scheduled_created
report_scheduled_sent
report_comparison_viewed
report_filter_applied
report_date_range_changed
```

---

## Implementation Timeline

### Phase 1: Core Reports (Week 1-2)
- [ ] Summary dashboard
- [ ] Transaction volume report
- [ ] Deadline compliance report
- [ ] Basic charts (line, bar, pie)

### Phase 2: Advanced Reports (Week 3)
- [ ] Pipeline analytics
- [ ] Comparative analysis
- [ ] Transaction details drill-down
- [ ] Advanced visualizations

### Phase 3: Export & Schedule (Week 4)
- [ ] PDF export
- [ ] CSV export
- [ ] Scheduled reports
- [ ] Email delivery

---

## Dependencies

### External
- Charting library (Recharts or Chart.js)
- PDF generation (PDFKit)
- CSV parsing (json2csv)

### Internal
- Transaction and deadline data
- User preferences
- Email service
- Cron scheduling

---

## Pricing

| Tier | Reports Included | Export | Scheduled |
|------|-----------------|--------|-----------|
| Free | Basic summary | No | No |
| Pro | All reports | PDF, CSV | Daily |
| Team | All reports + Team analytics | All formats | Custom |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Large data volumes | High | Medium | Pagination, caching |
| Slow report generation | Medium | High | Background jobs, caching |
| Inaccurate data | Low | High | Data validation, audits |
| Export failures | Low | Medium | Retry logic, fallbacks |

---

## Future Enhancements

1. **AI Insights** - Auto-generated insights from data
2. **Team Reports** - Aggregate team metrics
3. **Custom Reports** - User-defined report builder
4. **Real-time Dashboard** - Live updating metrics
5. **Benchmark Comparisons** - Compare to industry averages

---

*Created: March 2024*
*Target Launch: Month 2, Week 7*
