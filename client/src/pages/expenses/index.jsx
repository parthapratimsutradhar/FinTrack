import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import AddTransactionModal from '../../components/ui/AddTransactionModal';
import FilterToolbar from './components/FilterToolbar';
import SortControls from './components/SortControls';
import TransactionTable from './components/TransactionTable';
import TransactionCards from './components/TransactionCards';
import BulkActionsBar from './components/BulkActionsBar';
import Pagination from './components/Pagination';
import EmptyState from './components/EmptyState';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import EditTransactionModal from './components/EditTransactionModal';
import Icon from '../../components/AppIcon';

const ExpenseList = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com"
  });

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Grocery Shopping",
      amount: 156.78,
      category: "food",
      type: "expense",
      date: "2026-02-10",
      description: "Weekly groceries from Whole Foods including fresh produce, dairy products, and pantry essentials",
      createdAt: "2026-02-10T14:30:00Z"
    },
    {
      id: 2,
      title: "Monthly Salary",
      amount: 5500.00,
      category: "income",
      type: "income",
      date: "2026-02-01",
      description: "February salary payment from employer",
      createdAt: "2026-02-01T09:00:00Z"
    },
    {
      id: 3,
      title: "Uber Ride",
      amount: 24.50,
      category: "transport",
      type: "expense",
      date: "2026-02-09",
      description: "Ride from home to downtown office",
      createdAt: "2026-02-09T08:15:00Z"
    },
    {
      id: 4,
      title: "Electric Bill",
      amount: 89.32,
      category: "utilities",
      type: "expense",
      date: "2026-02-08",
      description: "Monthly electricity bill payment",
      createdAt: "2026-02-08T16:45:00Z"
    },
    {
      id: 5,
      title: "Netflix Subscription",
      amount: 15.99,
      category: "entertainment",
      type: "expense",
      date: "2026-02-07",
      description: "Monthly streaming service subscription",
      createdAt: "2026-02-07T12:00:00Z"
    },
    {
      id: 6,
      title: "Doctor Visit",
      amount: 120.00,
      category: "healthcare",
      type: "expense",
      date: "2026-02-06",
      description: "Annual health checkup and consultation",
      createdAt: "2026-02-06T10:30:00Z"
    },
    {
      id: 7,
      title: "Online Course",
      amount: 299.00,
      category: "education",
      type: "expense",
      date: "2026-02-05",
      description: "Web development bootcamp enrollment fee",
      createdAt: "2026-02-05T14:20:00Z"
    },
    {
      id: 8,
      title: "Freelance Project",
      amount: 850.00,
      category: "income",
      type: "income",
      date: "2026-02-04",
      description: "Payment for website design project",
      createdAt: "2026-02-04T11:00:00Z"
    },
    {
      id: 9,
      title: "New Shoes",
      amount: 89.99,
      category: "shopping",
      type: "expense",
      date: "2026-02-03",
      description: "Running shoes from Nike store",
      createdAt: "2026-02-03T15:30:00Z"
    },
    {
      id: 10,
      title: "Gas Station",
      amount: 45.00,
      category: "transport",
      type: "expense",
      date: "2026-02-02",
      description: "Fuel refill for car",
      createdAt: "2026-02-02T07:45:00Z"
    },
    {
      id: 11,
      title: "Restaurant Dinner",
      amount: 78.50,
      category: "food",
      type: "expense",
      date: "2026-02-01",
      description: "Dinner at Italian restaurant with friends",
      createdAt: "2026-02-01T19:30:00Z"
    },
    {
      id: 12,
      title: "Gym Membership",
      amount: 49.99,
      category: "healthcare",
      type: "expense",
      date: "2026-01-31",
      description: "Monthly gym membership renewal",
      createdAt: "2026-01-31T08:00:00Z"
    },
    {
      id: 13,
      title: "Coffee Shop",
      amount: 12.75,
      category: "food",
      type: "expense",
      date: "2026-01-30",
      description: "Morning coffee and pastry",
      createdAt: "2026-01-30T08:30:00Z"
    },
    {
      id: 14,
      title: "Book Purchase",
      amount: 34.99,
      category: "education",
      type: "expense",
      date: "2026-01-29",
      description: "Programming textbook from Amazon",
      createdAt: "2026-01-29T16:00:00Z"
    },
    {
      id: 15,
      title: "Side Hustle Income",
      amount: 450.00,
      category: "income",
      type: "income",
      date: "2026-01-28",
      description: "Consulting work payment",
      createdAt: "2026-01-28T13:00:00Z"
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    dateFrom: '',
    dateTo: ''
  });

  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('cards');
      } else {
        setViewMode('table');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFilteredTransactions = () => {
    return transactions?.filter(transaction => {
      const matchesSearch = !filters?.search || 
        transaction?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        transaction?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesCategory = !filters?.category || transaction?.category === filters?.category;
      const matchesType = !filters?.type || transaction?.type === filters?.type;
      
      const matchesDateFrom = !filters?.dateFrom || 
        new Date(transaction.date) >= new Date(filters.dateFrom);
      
      const matchesDateTo = !filters?.dateTo || 
        new Date(transaction.date) <= new Date(filters.dateTo);

      return matchesSearch && matchesCategory && matchesType && matchesDateFrom && matchesDateTo;
    });
  };

  const getSortedTransactions = (filtered) => {
    return [...filtered]?.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'amount') {
        comparison = a?.amount - b?.amount;
      } else if (sortBy === 'title') {
        comparison = a?.title?.localeCompare(b?.title);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const getPaginatedTransactions = (sorted) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sorted?.slice(startIndex, endIndex);
  };

  const filteredTransactions = getFilteredTransactions();
  const sortedTransactions = getSortedTransactions(filteredTransactions);
  const paginatedTransactions = getPaginatedTransactions(sortedTransactions);
  const totalPages = Math.ceil(sortedTransactions?.length / pageSize);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      type: '',
      dateFrom: '',
      dateTo: ''
    });
    setCurrentPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleSelectTransaction = (id) => {
    setSelectedIds(prev => 
      prev?.includes(id) 
        ? prev?.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(paginatedTransactions?.map(t => t?.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleEditTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev?.map(t => t?.id === updatedTransaction?.id ? updatedTransaction : t)
    );
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    setDeletingId(null);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (deletingId) {
      setTransactions(prev => prev?.filter(t => t?.id !== deletingId));
    } else {
      setTransactions(prev => prev?.filter(t => !selectedIds?.includes(t?.id)));
      setSelectedIds([]);
    }

    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeletingId(null);
  };

  const handleExport = () => {
    const csvContent = [
      ['Title', 'Category', 'Amount', 'Type', 'Date', 'Description'],
      ...sortedTransactions?.map(t => [
        t?.title,
        t?.category,
        t?.amount,
        t?.type,
        t?.date,
        t?.description || ''
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const hasActiveFilters = filters?.category || filters?.type || filters?.dateFrom || filters?.dateTo || filters?.search;

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationBar user={user} onLogout={handleLogout} />
      <main className="pt-nav pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                All Transactions
              </h1>
              <button
                onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <Icon name={viewMode === 'table' ? 'LayoutGrid' : 'Table'} size={18} />
                <span className="text-sm font-medium">
                  {viewMode === 'table' ? 'Card View' : 'Table View'}
                </span>
              </button>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage and track all your financial transactions in one place
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <FilterToolbar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              resultCount={filteredTransactions?.length}
              onExport={handleExport}
            />

            <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />

            {paginatedTransactions?.length === 0 ? (
              <EmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
                onAddTransaction={() => setIsAddModalOpen(true)}
              />
            ) : (
              <>
                {viewMode === 'table' ? (
                  <TransactionTable
                    transactions={paginatedTransactions}
                    selectedIds={selectedIds}
                    onSelectTransaction={handleSelectTransaction}
                    onSelectAll={handleSelectAll}
                    onEdit={(transaction) => {
                      setEditingTransaction(transaction);
                      setIsEditModalOpen(true);
                    }}
                    onDelete={handleDeleteClick}
                  />
                ) : (
                  <TransactionCards
                    transactions={paginatedTransactions}
                    selectedIds={selectedIds}
                    onSelectTransaction={handleSelectTransaction}
                    onEdit={(transaction) => {
                      setEditingTransaction(transaction);
                      setIsEditModalOpen(true);
                    }}
                    onDelete={handleDeleteClick}
                  />
                )}

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    totalItems={sortedTransactions?.length}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(newSize) => {
                      setPageSize(newSize);
                      setCurrentPage(1);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
      <BulkActionsBar
        selectedCount={selectedIds?.length}
        onDeleteSelected={handleDeleteSelected}
        onDeselectAll={handleDeselectAll}
      />
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTransaction}
      />
      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleEditTransaction}
        transaction={editingTransaction}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingId(null);
        }}
        onConfirm={handleDeleteConfirm}
        transactionCount={deletingId ? 1 : selectedIds?.length}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ExpenseList;