import { Clock, DollarSign, Smartphone, Zap } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: Zap,
    title: "Early Detection",
    description:
      "Catch diseases before they spread. Early treatment prevents small problems from destroying entire crops.",
    color: "var(--green-forest)",
    bgColor: "var(--green-pale)",
    iconBg: "var(--green-forest)",
  },
  {
    icon: DollarSign,
    title: "Save Money",
    description:
      "Reduce pesticide costs by treating only what's needed. Stop guessing — treat the right disease with the right solution.",
    color: "var(--brown-earth)",
    bgColor: "oklch(0.95 0.04 70)",
    iconBg: "var(--brown-earth)",
  },
  {
    icon: Smartphone,
    title: "Works Anywhere",
    description:
      "Use it from your phone right in the field. No internet connection needed for the photo — just upload when you have signal.",
    color: "oklch(0.38 0.12 230)",
    bgColor: "oklch(0.93 0.04 230)",
    iconBg: "oklch(0.38 0.12 230)",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description:
      "Get a full diagnosis in under 3 seconds. No waiting days for a lab, no expensive expert visits required.",
    color: "oklch(0.42 0.12 320)",
    bgColor: "oklch(0.93 0.04 320)",
    iconBg: "oklch(0.42 0.12 320)",
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-20 px-4"
      style={{ background: "var(--cream-warm)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: "var(--green-deep)",
              fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
            }}
          >
            Why Farmers Trust PlantGuard
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--brown-earth)" }}
          >
            Built for real farmers, tested in real fields, delivering real
            results
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="flex gap-5 p-6 rounded-2xl h-full"
                style={{
                  background: benefit.bgColor,
                  border: `1.5px solid ${benefit.bgColor}`,
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl shadow-sm"
                  style={{ background: benefit.iconBg }}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      color: "var(--green-deep)",
                      fontFamily: "Bricolage Grotesque, system-ui, sans-serif",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: "oklch(0.32 0.05 145)" }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-14"
        >
          {[
            { emoji: "🌾", text: "50,000+ Training Images" },
            { emoji: "🎯", text: "96% Average Accuracy" },
            { emoji: "🌍", text: "Works in Any Region" },
            { emoji: "🔒", text: "Private & Secure" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-5 py-3 rounded-full"
              style={{
                background: "white",
                border: "1.5px solid var(--green-pale)",
                color: "var(--green-forest)",
              }}
            >
              <span className="text-xl">{badge.emoji}</span>
              <span className="font-semibold text-sm">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
