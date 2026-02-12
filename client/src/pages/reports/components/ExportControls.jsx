import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExportControls = ({ periodType, selectedYear, selectedMonth, reportData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleExportCSV = () => {
    setIsExporting(true);
    setExportType('csv');

    setTimeout(() => {
      const csvData = generateCSVData();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL?.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `financial-report-${periodType}-${selectedYear}${periodType === 'monthly' ? `-${selectedMonth}` : ''}.csv`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      window.URL?.revokeObjectURL(url);

      setIsExporting(false);
      setExportType(null);
    }, 1500);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setExportType('pdf');

    setTimeout(() => {
      alert('PDF export functionality would generate a formatted PDF report with charts and tables. This is a demo implementation.');
      setIsExporting(false);
      setExportType(null);
    }, 1500);
  };

  const handleEmailReport = () => {
    setIsExporting(true);
    setExportType('email');

    setTimeout(() => {
      alert('Email functionality would send the report to your registered email address. This is a demo implementation.');
      setIsExporting(false);
      setExportType(null);
    }, 1500);
  };

  const generateCSVData = () => {
    const periodLabel = periodType === 'monthly' 
      ? `${monthNames?.[selectedMonth - 1]} ${selectedYear}`
      : `Year ${selectedYear}`;

    let csv = `Financial Report - ${periodLabel}\n\n`;
    
    csv += 'Summary\n';
    csv += 'Metric,Amount\n';
    csv += `Total Income,$${reportData?.summary?.totalIncome?.toFixed(2)}\n`;
    csv += `Total Expenses,$${reportData?.summary?.totalExpenses?.toFixed(2)}\n`;
    csv += `Savings,$${reportData?.summary?.savings?.toFixed(2)}\n`;
    csv += `Spending Variance,${reportData?.summary?.variance?.toFixed(2)}%\n\n`;

    csv += 'Category Breakdown\n';
    csv += 'Category,Spent,Budget,Percentage\n';
    reportData?.categories?.forEach(cat => {
      csv += `${cat?.name},$${cat?.value?.toFixed(2)},$${cat?.budget?.toFixed(2)},${cat?.percentage}%\n`;
    });

    csv += '\nBudget Comparison\n';
    csv += 'Category,Budget,Actual,Variance\n';
    reportData?.budgetComparison?.forEach(item => {
      csv += `${item?.category},$${item?.budget?.toFixed(2)},$${item?.actual?.toFixed(2)},$${item?.variance?.toFixed(2)}\n`;
    });

    return csv;
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-financial border border-border">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-card-foreground">
          Export Report
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Download or share your financial report in various formats
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* CSV Export */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border hover:border-primary transition-smooth">
          <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mb-3 mx-auto">
            <Icon name="FileSpreadsheet" size={24} className="text-success" />
          </div>
          <h4 className="text-sm font-semibold text-center text-card-foreground mb-2">
            CSV Export
          </h4>
          <p className="text-xs text-muted-foreground text-center mb-4">
            Download raw data for analysis in Excel or Google Sheets
          </p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleExportCSV}
            loading={isExporting && exportType === 'csv'}
            disabled={isExporting}
            iconName="Download"
            iconPosition="left"
          >
            Export CSV
          </Button>
        </div>

        {/* PDF Export */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border hover:border-primary transition-smooth">
          <div className="flex items-center justify-center w-12 h-12 bg-error/10 rounded-lg mb-3 mx-auto">
            <Icon name="FileText" size={24} className="text-error" />
          </div>
          <h4 className="text-sm font-semibold text-center text-card-foreground mb-2">
            PDF Report
          </h4>
          <p className="text-xs text-muted-foreground text-center mb-4">
            Generate formatted report with charts and detailed analysis
          </p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleExportPDF}
            loading={isExporting && exportType === 'pdf'}
            disabled={isExporting}
            iconName="Download"
            iconPosition="left"
          >
            Export PDF
          </Button>
        </div>

        {/* Email Report */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border hover:border-primary transition-smooth">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 mx-auto">
            <Icon name="Mail" size={24} className="text-primary" />
          </div>
          <h4 className="text-sm font-semibold text-center text-card-foreground mb-2">
            Email Report
          </h4>
          <p className="text-xs text-muted-foreground text-center mb-4">
            Send comprehensive report directly to your email inbox
          </p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleEmailReport}
            loading={isExporting && exportType === 'email'}
            disabled={isExporting}
            iconName="Send"
            iconPosition="left"
          >
            Email Report
          </Button>
        </div>
      </div>

      {/* Export Info */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-card-foreground mb-1">
              Export Information
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• CSV exports include all raw transaction data and summaries</li>
              <li>• PDF reports contain formatted charts and visual analysis</li>
              <li>• Email reports are sent to your registered email address</li>
              <li>• All exports respect your selected time period and filters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;