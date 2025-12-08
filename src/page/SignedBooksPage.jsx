import React, { useEffect, useState } from "react";
import {
  BookOpen,
  MapPin,
  Mail,
  Phone,
  Package,
  Truck,
  Globe,
  AlertCircle,
} from "lucide-react";

// Mock supabase - replace with: import { supabase } from "../lib/supabaseClient";
const supabase = {
  from: (table) => ({
    select: () => ({
      eq: () =>
        Promise.resolve({
          data: [
            {
              id: 1,
              store_name: "Litireso Africa",
              address: "8 Providence street, Lekki phase 1",
              city: "Lagos",
              country: "Nigeria",
              email: "hello@litireso.africa",
              phone: "+234 XXX XXX XXXX",
              description:
                "If you can't catch up with Ayodeji at one of his upcoming appearances and events, you can order signed copies of any of his books through Litireso Africa in Lagos.",
              shipping_info:
                "Yes, they'll ship internationally! Please allow ample time if you are purchasing a book as a gift.",
              is_active: true,
              created_at: new Date().toISOString(),
            },
          ],
          error: null,
        }),
    }),
  }),
};

export default function SignedBooksPage() {
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoreInfo();
  }, []);

  const fetchStoreInfo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("signed_books_info")
        .select("*")
        .eq("is_active", true);

      if (error) throw error;
      if (data && data.length > 0) {
        setStoreInfo(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading information...</p>
        </div>
      </div>
    );
  }

  if (!storeInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Information Not Available
          </h2>
          <p className="text-gray-600">
            Signed books information is currently unavailable. Please check back
            later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Signed Books</h1>
              <p className="text-sm text-gray-600 mt-1">
                Order your personalized signed copy
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <Package className="w-12 h-12 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-2">Get Your Signed Copy</h2>
              <p className="text-amber-100 text-lg">{storeInfo.description}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Store Contact Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-lg">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {storeInfo.store_name}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {storeInfo.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {storeInfo.city}, {storeInfo.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <a
                  href={`mailto:${storeInfo.email}`}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  {storeInfo.email}
                </a>
              </div>

              {storeInfo.phone && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <a
                    href={`tel:${storeInfo.phone}`}
                    className="text-sm text-gray-900 font-medium"
                  >
                    {storeInfo.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href={`mailto:${storeInfo.email}`}
                className="w-full block text-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
              >
                Contact Store
              </a>
            </div>
          </div>

          {/* Shipping Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Shipping Information
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      International Shipping Available
                    </p>
                    <p className="text-sm text-gray-700">
                      {storeInfo.shipping_info}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  How to Order:
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-gray-700">
                      Contact the store via email or phone
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-gray-700">
                      Specify which book you'd like signed
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-gray-700">
                      Provide your shipping address
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      4
                    </div>
                    <p className="text-sm text-gray-700">
                      Allow ample time for processing and delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Note */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Package className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Important Note
              </h4>
              <p className="text-sm text-gray-700">
                If you're purchasing a book as a gift, please make sure to order
                well in advance to ensure timely delivery. International orders
                may take longer depending on your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
