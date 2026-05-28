"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Download, AlertCircle, ArrowLeft } from "lucide-react";
import { getProduct } from "@/lib/products";

type Props =
  | { status: "success"; downloadToken: string; productId: string }
  | { status: "error"; message: string };

export default function SuccessClient(props: Props) {
  if (props.status === "error") {
    return (
      <section className="section gradient-dark text-ash min-h-[60vh] flex items-center">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-12 h-12 text-ember mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-ash/70 mb-8 max-w-md mx-auto">{props.message}</p>
            <div className="flex gap-4 justify-center">
              <Link href="/downloads" className="btn-secondary-dark inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Downloads
              </Link>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const product = getProduct(props.productId);

  return (
    <section className="section gradient-dark text-ash min-h-[60vh] flex items-center">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 text-ember mx-auto mb-6" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Payment confirmed.
          </h1>

          {product && (
            <p className="text-ash/70 text-lg mb-2">{product.name}</p>
          )}

          <p className="text-ash/50 text-sm mb-10">
            You have 5 downloads available. Link expires in 30 days.
          </p>

          <a
            href={`/api/download/${props.downloadToken}`}
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4 mb-6"
          >
            <Download className="w-5 h-5" />
            Download Your Files
          </a>

          <p className="text-ash/40 text-xs">
            Bookmark this page or save this URL — it&apos;s the only way to access your download.
          </p>

          <div className="mt-10 pt-8 border-t border-white/10">
            <Link href="/downloads" className="text-ash/50 hover:text-ash text-sm transition-colors">
              ← Back to Downloads
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
