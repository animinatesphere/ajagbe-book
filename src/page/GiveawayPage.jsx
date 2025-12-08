import React, { useEffect, useState } from "react";
import { Gift, Calendar, Trophy, CheckCircle, AlertCircle } from "lucide-react";

// Mock supabase - replace with: import { supabase } from "../lib/supabaseClient";
const supabase = {
  from: (table) => ({
    select: () => ({
      eq: () =>
        Promise.resolve({
          data: [
            {
              id: 1,
              title:
                "What Happened to Helen - Kindle Edition + $25 Amazon Gift Card",
              description:
                "Ayodeji Ajagbe is giving away a Kindle edition of What Happened to Helen and a $25 Amazon Gift Card to one winner.",
              prize: "Kindle Edition + $25 Amazon Gift Card",
              rules:
                "• One contest entry per contest per month.\n• Full contest rules are available at Writerspace.com. Entering this contest indicates you have read and agree to our Terms of Use.\n• Entering the contest grants us permission to list your name as our winner and to add you to Ayodeji Ajagbe's mailing list.",
              is_active: true,
              created_at: new Date().toISOString(),
            },
          ],
          error: null,
        }),
    }),
  }),
};

export default function GiveawayPage() {
  const [giveaway, setGiveaway] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchGiveaway();
  }, []);

  const fetchGiveaway = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("giveaways")
        .select("*")
        .eq("is_active", true);

      if (error) throw error;
      if (data && data.length > 0) {
        setGiveaway(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.agree) {
      alert("Please agree to the terms and conditions");
      return;
    }
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    // Handle form submission here
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading giveaway...</p>
        </div>
      </div>
    );
  }

  if (!giveaway) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Active Giveaway
          </h2>
          <p className="text-gray-600">
            Check back soon for exciting giveaways!
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You're Entered!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for entering the giveaway. Good luck!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Enter Another Contest
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Giveaway</h1>
              <p className="text-sm text-gray-600 mt-1">
                Enter to win amazing prizes
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Prize Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row items-start gap-4">
            <Trophy className="w-12 h-12 flex-shrink-0 flex justify-center" />
            <div>
              <h2 className="text-2xl font-bold mb-2">{giveaway.title}</h2>
              <p className="text-purple-100 text-lg">{giveaway.description}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Entry Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Enter the Giveaway
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agree}
                    onChange={(e) =>
                      setFormData({ ...formData, agree: e.target.checked })
                    }
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the contest rules and terms of use. I understand
                    my information will be used to contact me if I win and to
                    add me to the mailing list.
                  </span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Submit Entry
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your name and information will never be given or sold to anyone
                outside of Writerspace. You may read our full privacy policy at
                Writerspace.com.
              </p>
            </div>
          </div>

          {/* Rules Sidebar */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Contest Rules
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              {giveaway.rules.split("\n").map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{rule.replace("•", "").trim()}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Started {new Date(giveaway.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
