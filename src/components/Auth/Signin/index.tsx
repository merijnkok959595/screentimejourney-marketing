import Link from "next/link";
import React from "react";

const Signin = () => {
  return (
    <section className="overflow-hidden py-20 bg-gray-2">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
          <div className="text-center mb-11">
            <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
              Sign In Available in Header
            </h2>
            <p>Use the sign in button in the website header to access your account</p>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg"
              style={{ 
                backgroundColor: 'var(--brand-primary)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Go to Homepage
            </Link>
          </div>

          </div>
        </div>
      </section>
    );
  };

export default Signin;
