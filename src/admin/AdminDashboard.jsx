import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/useToast";
import {
  BookOpen,
  Bell,
  Truck,
  CheckCircle,
  Search,
  X,
  Package,
  DollarSign,
  Clock,
  TrendingUp,
  Store,
  MapPin,
  Gift,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

function requireAdmin() {
  return localStorage.getItem("isAdmin") === "true";
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    price: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("books");

  // Signed Books Info State
  const [signedBooksInfo, setSignedBooksInfo] = useState([]);
  const [signedBooksLoading, setSignedBooksLoading] = useState(false);
  const [signedBookForm, setSignedBookForm] = useState({
    store_name: "",
    address: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    description: "",
    shipping_info: "",
    is_active: true,
  });
  const [editingSignedBook, setEditingSignedBook] = useState(null);

  useEffect(() => {
    if (!requireAdmin()) {
      navigate("/admin/login");
      return;
    }
    fetchBooks();
    fetchOrders();
    fetchSignedBooksInfo();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("books").select("*");
      if (error) throw error;
      setBooks(data || []);
    } catch (e) {
      console.debug(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setOrders(data || []);
    } catch (e) {
      console.debug(e);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchSignedBooksInfo = async () => {
    setSignedBooksLoading(true);
    try {
      const { data, error } = await supabase
        .from("signed_books_info")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setSignedBooksInfo(data || []);
    } catch (e) {
      console.debug(e);
    } finally {
      setSignedBooksLoading(false);
    }
  };

  const uploadAndCreate = async (e) => {
    e.preventDefault();
    const { show } = toast;
    if (!form.title || !form.slug) {
      show("Title and slug required", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      let image_url = null;

      if (file) {
        try {
          const fileName = `${Date.now()}_${file.name}`;
          const { error: upErr } = await supabase.storage
            .from("book-images")
            .upload(fileName, file, { cacheControl: "3600", upsert: false });

          if (upErr) {
            console.warn("Image upload failed:", upErr);
            show("Image upload failed, but book will be saved without image", {
              type: "warning",
            });
          } else {
            const { data: publicUrlData } = supabase.storage
              .from("book-images")
              .getPublicUrl(fileName);
            image_url = publicUrlData.publicUrl;
          }
        } catch (uploadError) {
          console.warn("Image upload error:", uploadError);
          show("Image upload failed, but book will be saved without image", {
            type: "warning",
          });
        }
      }

      const payload = {
        slug: form.slug,
        title: form.title,
        description: form.description,
        price: form.price,
        image_url,
      };

      const { error } = await supabase.from("books").upsert(payload);
      if (error) throw error;

      show("Book saved successfully!", { type: "success" });
      setForm({ title: "", slug: "", price: "", description: "" });
      setFile(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.show("Failed to create book. Check console.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const saveSignedBookInfo = async (e) => {
    e.preventDefault();
    const { show } = toast;
    if (!signedBookForm.store_name) {
      show("Store name is required", { type: "error" });
      return;
    }
    setSignedBooksLoading(true);
    try {
      if (editingSignedBook) {
        const { error } = await supabase
          .from("signed_books_info")
          .update(signedBookForm)
          .eq("id", editingSignedBook.id);
        if (error) throw error;
        show("Store info updated successfully!", { type: "success" });
      } else {
        const { error } = await supabase
          .from("signed_books_info")
          .insert([signedBookForm]);
        if (error) throw error;
        show("Store info added successfully!", { type: "success" });
      }

      setSignedBookForm({
        store_name: "",
        address: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        description: "",
        shipping_info: "",
        is_active: true,
      });
      setEditingSignedBook(null);
      fetchSignedBooksInfo();
    } catch (err) {
      console.error(err);
      show("Failed to save store info. Check console.", { type: "error" });
    } finally {
      setSignedBooksLoading(false);
    }
  };

  const deleteSignedBookInfo = async (id) => {
    if (!confirm("Are you sure you want to delete this store?")) return;
    try {
      const { error } = await supabase
        .from("signed_books_info")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.show("Store deleted successfully!", { type: "success" });
      fetchSignedBooksInfo();
    } catch (err) {
      console.error(err);
      toast.show("Failed to delete store.", { type: "error" });
    }
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const unreadCount = orders.filter((o) => o.unread).length;
  const paidCount = orders.filter((o) => o.paid).length;
  const totalRevenue = orders
    .filter((o) => o.paid)
    .reduce((sum, o) => {
      const amount = String(o.total || "").replace(/[^0-9.]/g, "");
      return sum + parseFloat(amount || "0");
    }, 0);

  const filteredOrders = useMemo(() => {
    if (!search) return orders;
    const q = String(search).toLowerCase().trim();
    return orders.filter((o) => {
      return (
        (o.name && o.name.toLowerCase().includes(q)) ||
        (o.email && o.email.toLowerCase().includes(q)) ||
        (o.total && String(o.total).toLowerCase().includes(q)) ||
        (o.id && String(o.id).includes(q))
      );
    });
  }, [orders, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your books, orders, and stores
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all hover:shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-sm border border-indigo-100 p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {books.length}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl shadow-sm border border-yellow-100 p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unread Orders
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {unreadCount}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {paidCount}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₦{totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("books")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === "books"
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Books
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === "orders"
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package className="w-4 h-4 inline mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab("stores")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === "stores"
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Store className="w-4 h-4 inline mr-2" />
              Signed Books
            </button>
          </div>
        </div>

        {/* Books Tab */}
        {activeTab === "books" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Book Form */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Book
              </h2>
              <form onSubmit={uploadAndCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Title
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Enter book title"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (unique identifier)
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g., book-title-slug"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="₦4000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Enter book description..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional - if upload fails, book will be saved without image
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                >
                  {loading ? "Saving..." : "Save Book"}
                </button>
              </form>
            </div>

            {/* Books List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Books
              </h3>
              {loading && (
                <div className="text-sm text-gray-500">Loading...</div>
              )}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {books.map((b) => (
                  <div
                    key={b.slug || b.id}
                    className="flex items-center gap-3 border border-gray-200 p-3 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <img
                      src={
                        b.image_url ||
                        b.image ||
                        "https://via.placeholder.com/48"
                      }
                      alt=""
                      className="w-12 h-12 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {b.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {b.slug}
                      </div>
                      <div className="text-sm font-medium text-indigo-600">
                        {b.price}
                      </div>
                    </div>
                  </div>
                ))}
                {books.length === 0 && !loading && (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No books yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Manage all customer orders
                </p>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or ID..."
                  className="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {ordersLoading ? (
              <div className="text-center py-12 text-gray-500">
                Loading orders...
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delivery
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.map((o) => (
                        <tr
                          key={o.id}
                          className={`${
                            o.unread ? "bg-yellow-50" : ""
                          } hover:bg-gray-50 transition-colors`}
                        >
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{o.id}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {o.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {o.email}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {o.total}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {o.delivery_type}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                o.paid
                                  ? "bg-green-100 text-green-800"
                                  : o.status === "sent"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {o.paid ? "Paid" : o.status}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(o.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => setSelectedOrder(o)}
                              className="text-indigo-600 hover:text-indigo-900 font-medium"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center">
                            <Package className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <p className="text-gray-500">No orders found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Signed Books Stores Tab */}
        {activeTab === "stores" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Store Form */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                {editingSignedBook ? (
                  <Edit2 className="w-5 h-5 mr-2" />
                ) : (
                  <Plus className="w-5 h-5 mr-2" />
                )}
                {editingSignedBook ? "Edit Store" : "Add New Store"}
              </h2>
              <form onSubmit={saveSignedBookInfo} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Name *
                    </label>
                    <input
                      value={signedBookForm.store_name}
                      onChange={(e) =>
                        setSignedBookForm({
                          ...signedBookForm,
                          store_name: e.target.value,
                        })
                      }
                      placeholder="Enter store name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={signedBookForm.phone}
                    onChange={(e) =>
                      setSignedBookForm({
                        ...signedBookForm,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+234 XXX XXX XXXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={signedBookForm.description}
                    onChange={(e) =>
                      setSignedBookForm({
                        ...signedBookForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter store description..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Information
                  </label>
                  <textarea
                    value={signedBookForm.shipping_info}
                    onChange={(e) =>
                      setSignedBookForm({
                        ...signedBookForm,
                        shipping_info: e.target.value,
                      })
                    }
                    placeholder="Enter shipping details..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={signedBookForm.is_active}
                    onChange={(e) =>
                      setSignedBookForm({
                        ...signedBookForm,
                        is_active: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="is_active"
                    className="text-sm font-medium text-gray-700"
                  >
                    Store is Active
                  </label>
                </div>

                <div className="flex gap-3">
                  {editingSignedBook && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSignedBook(null);
                        setSignedBookForm({
                          store_name: "",
                          address: "",
                          city: "",
                          country: "",
                          email: "",
                          phone: "",
                          description: "",
                          shipping_info: "",
                          is_active: true,
                        });
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={signedBooksLoading}
                    className="flex-1 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                  >
                    {signedBooksLoading
                      ? "Saving..."
                      : editingSignedBook
                      ? "Update Store"
                      : "Save Store"}
                  </button>
                </div>
              </form>
            </div>

            {/* Stores List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Signed Book Stores
              </h3>
              {signedBooksLoading && (
                <div className="text-sm text-gray-500">Loading...</div>
              )}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {signedBooksInfo.map((store) => (
                  <div
                    key={store.id}
                    className="border border-gray-200 p-4 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate flex items-center gap-2">
                          {store.store_name}
                          {store.is_active ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Inactive
                            </span>
                          )}
                        </div>
                        {store.city && (
                          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {store.city}
                            {store.country && `, ${store.country}`}
                          </div>
                        )}
                        {store.email && (
                          <div className="text-xs text-gray-500 mt-1">
                            {store.email}
                          </div>
                        )}
                      </div>
                    </div>
                    {store.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {store.description}
                      </p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          setEditingSignedBook(store);
                          setSignedBookForm({
                            store_name: store.store_name || "",
                            address: store.address || "",
                            city: store.city || "",
                            country: store.country || "",
                            email: store.email || "",
                            phone: store.phone || "",
                            description: store.description || "",
                            shipping_info: store.shipping_info || "",
                            is_active: store.is_active ?? true,
                          });
                        }}
                        className="flex-1 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSignedBookInfo(store.id)}
                        className="flex-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {signedBooksInfo.length === 0 && !signedBooksLoading && (
                  <div className="text-center py-8 text-gray-500">
                    <Store className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No stores yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Order Details</p>
                <h3 className="text-xl font-bold text-gray-900">
                  #{selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  Customer Information
                </h4>
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedOrder.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedOrder.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedOrder.phone || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedOrder.location || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  Order Details
                </h4>
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Delivery Type</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedOrder.delivery_type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="text-sm font-bold text-gray-900">
                      {selectedOrder.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span
                      className={`text-sm font-medium ${
                        selectedOrder.paid ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {selectedOrder.paid ? "Paid" : selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  Items
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-700 max-h-40 overflow-auto">
                  {typeof selectedOrder.items === "string"
                    ? selectedOrder.items
                    : JSON.stringify(selectedOrder.items, null, 2)}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={async () => {
                    try {
                      await supabase
                        .from("orders")
                        .update({ unread: false })
                        .eq("id", selectedOrder.id);
                      fetchOrders();
                      setSelectedOrder(null);
                      toast.show("Marked as read", { type: "success" });
                    } catch (e) {
                      console.debug(e);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Mark Read
                </button>
                <button
                  onClick={async () => {
                    try {
                      await supabase
                        .from("orders")
                        .update({ status: "sent" })
                        .eq("id", selectedOrder.id);
                      fetchOrders();
                      setSelectedOrder(null);
                      toast.show("Marked as sent", { type: "success" });
                    } catch (e) {
                      console.debug(e);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark Sent
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
