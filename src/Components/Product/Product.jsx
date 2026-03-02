import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Check, CheckCircle2, Award, Zap, Shield } from "lucide-react";

const Product = () => {
  const products = [
    {
      id: 1,
      name: "SRM-Premix (Boron Oxide)",
      badge: "Premium • Main Product",
      isMain: true,
      description:
        "A premium silica ramming mass manufactured using high-purity quartzite aggregates and a controlled boron oxide premix bonding system.",
      fullDescription:
        "The product is designed to achieve uniform sintering at induction furnace operating temperatures, forming a dense and stable lining structure after firing. Controlled particle size distribution ensures proper compaction during ramming and consistent lining formation. The formulation provides stable thermal behavior, good hot strength, and reliable performance under high-temperature melting conditions when installed and heated as per recommended furnace practices.",
      icon: Award,
      benefits: [
        "Improved slag and metal penetration resistance due to dense sintered structure",
        "Better thermal shock resistance, reducing crack formation during heating and cooling cycles",
        "Stable heat transfer and thermal profile across the lining after proper sintering",
        "Higher structural integrity at operating temperatures, supporting longer and more stable furnace campaigns",
      ],
      gradient: "from-orange-600 to-orange-400",
      borderColor: "border-orange-500/50",
    },
    {
      id: 2,
      name: "SRM-Premix (Boric Acid)",
      badge: "Standard Grade",
      isMain: false,
      description:
        "A standard-grade silica ramming mass using selected quartzite aggregates and boric acid premix bonding system.",
      fullDescription:
        "The formulation is designed to provide controlled sintering and uniform lining formation under normal induction furnace operating conditions. Carefully graded particle size distribution allows proper ramming and compaction, resulting in consistent lining density after firing. The product offers stable thermal behavior and dependable structural performance when installed and heated according to recommended furnace practices.",
      icon: Zap,
      benefits: [
        "Consistent sintering and lining formation under standard melting temperatures",
        "Good resistance to thermal shock during routine heating and cooling cycles",
        "Stable lining structure for regular production operations",
        "Balanced performance and cost for medium-duty furnace campaigns",
      ],
      gradient: "from-orange-500 to-orange-300",
      borderColor: "border-orange-400/40",
    },
    {
      id: 3,
      name: "SRM-LITE",
      badge: "Economy Grade",
      isMain: false,
      description:
        "An economy-grade silica ramming mass supplied without any premixed bonding agent.",
      fullDescription:
        "It is manufactured using selected, cost-optimized silica aggregates with controlled particle size distribution to ensure proper ramming and uniform lining formation. The product allows steel plants to add their preferred bonding agent based on their furnace practice, operating temperature, and campaign requirements. When installed and heated following standard procedures, SRM-LITE provides basic sintering and structural stability suitable for short to medium campaign operations.",
      icon: Shield,
      benefits: [
        "Flexibility in binder selection, allowing plant-specific control over lining performance",
        "Cost-effective solution for budget-sensitive or short campaign applications",
        "Easy ramming and installation due to controlled grain distribution",
      ],
      gradient: "from-orange-400 to-orange-200",
      borderColor: "border-orange-300/30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative min-h-screen w-full bg-neutral-950 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_0%,rgba(249,115,22,0.15),transparent_50%)]" />

      {/* Soft glow blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-orange-600/5 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Our Premium Products
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Engineered excellence in silica ramming mass technology. Discover
            solutions designed for your furnace requirements.
          </p>
        </motion.div>

        {/* Main Product - Featured */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 lg:px-12 mb-12"
        >
          {products.map(
            (product, idx) =>
              product.isMain && (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className={`group relative rounded-2xl overflow-hidden border-2 ${product.borderColor} bg-neutral-900/80 backdrop-blur-sm shadow-2xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-[1.01]`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${product.gradient} transition-opacity duration-300`}
                  />

                  {/* Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${product.gradient} text-white font-bold text-sm`}>
                      <Zap className="w-4 h-4" />
                      {product.badge}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 p-8 md:p-12 relative z-10">
                    {/* Left: Icon and Title */}
                    <div className="md:col-span-1 flex flex-col justify-start">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${product.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                        <product.icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className={`text-3xl font-black mb-2 bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
                        {product.name}
                      </h2>
                    </div>

                    {/* Middle: Description */}
                    <div className="md:col-span-1">
                      <p className="text-neutral-200 mb-4">{product.description}</p>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {product.fullDescription}
                      </p>
                    </div>

                    {/* Right: Benefits */}
                    <div className="md:col-span-1">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-orange-400" />
                        Key Benefits
                      </h3>
                      <ul className="space-y-3">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex gap-3">
                            <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="text-neutral-300 text-sm">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </motion.div>

        {/* Other Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 lg:px-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Additional Solutions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map(
              (product) =>
                !product.isMain && (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className={`group relative rounded-xl overflow-hidden border-2 ${product.borderColor} bg-neutral-900/60 backdrop-blur-sm hover:bg-neutral-900/80 transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-r ${product.gradient} transition-opacity duration-300`}
                    />

                    <div className="p-8 relative z-10">
                      {/* Badge and Icon */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br ${product.gradient} group-hover:scale-105 transition-transform`}>
                          <product.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${product.gradient} text-white`}>
                          {product.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-2xl font-bold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent mb-4`}>
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-300 mb-4 text-sm">
                        {product.description}
                      </p>
                      <p className="text-neutral-400 text-xs mb-6 leading-relaxed">
                        {product.fullDescription}
                      </p>

                      {/* Benefits */}
                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-orange-400" />
                          Benefits
                        </h4>
                        <ul className="space-y-2">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex gap-2 text-xs">
                              <Check className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                              <span className="text-neutral-400">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 lg:px-12 mt-20 text-center"
        >
          <div className="relative rounded-2xl border-2 border-orange-500/30 bg-gradient-to-r from-orange-600/10 to-orange-400/5 backdrop-blur-sm p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Contact our expert team to discuss your specific furnace
              requirements and find the perfect ramming mass solution for your
              operation.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                Get in Touch
              </NavLink>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Product;
