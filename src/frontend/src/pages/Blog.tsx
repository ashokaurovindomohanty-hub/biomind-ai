import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  tag: string;
  tagVariant: string;
  excerpt: string;
  heroIcon?: React.ReactNode;
  heroImage?: string;
  sections: { heading: string; content: string[] }[];
}

const blogs: BlogPost[] = [
  {
    id: "ai-in-biotech",
    title:
      "The Future of AI in Biotechnology: Transforming Medicine as We Know It",
    author: "Dr. Sarah Mitchell",
    authorInitials: "SM",
    date: "March 30, 2026",
    readTime: "8 min read",
    tag: "Featured Article",
    tagVariant: "green",
    excerpt:
      "Artificial intelligence is reshaping every layer of modern medicine — from genomics to surgical robotics. Discover how AI is accelerating breakthroughs that once took decades.",
    sections: [
      {
        heading: "Introduction",
        content: [
          "Artificial intelligence is no longer a distant promise in biotechnology — it is an active, transformative force reshaping every layer of modern medicine. From genomics to drug discovery, from surgical robotics to early disease detection, AI algorithms are accelerating capabilities that once took decades to develop.",
          "The convergence of unprecedented computational power, vast biological datasets, and increasingly sophisticated machine learning architectures has created a perfect storm of innovation. Biotechnology companies that once measured progress in years are now reporting breakthroughs in months — sometimes weeks. This article explores how AI is fundamentally changing what is biologically possible.",
        ],
      },
      {
        heading: "Genomics and Precision Medicine",
        content: [
          "The human genome contains approximately 3 billion base pairs, encoding roughly 20,000 protein-coding genes. For decades, understanding the relationship between genetic variants and disease was a painstaking, manual process. AI has fundamentally transformed this landscape. Deep learning models can now analyze millions of genomic sequences simultaneously, identifying disease-causing mutations with a precision and speed that no human team could match.",
          "DeepMind's AlphaFold stands as arguably the most significant scientific breakthrough of the past decade. By predicting the 3D structure of proteins from their amino acid sequences, AlphaFold effectively solved a problem that had stumped structural biologists for 50 years — unlocking new frontiers in drug target identification. Clinical studies have shown that AI-driven genomic analysis achieves a 50% reduction in time to identify disease biomarkers, compressing timelines from 18 months to under 9.",
          "Precision medicine — tailoring treatment to an individual's unique genetic profile — is now moving from experimental trials into routine clinical practice. AI models cross-reference a patient's genomic data against population-level studies, tumor mutation profiles, and pharmacogenomic databases to recommend therapies with dramatically improved efficacy and reduced side-effect profiles.",
        ],
      },
      {
        heading: "AI-Powered Drug Discovery",
        content: [
          "Traditional drug discovery is notoriously slow and expensive. Taking a molecule from initial identification to FDA approval historically required 12 to 15 years and upwards of $2.6 billion in investment — with a success rate below 10%. AI is fundamentally changing this equation. Machine learning models can now screen billions of molecular compounds in silico, predicting binding affinity, toxicity profiles, and bioavailability with remarkable accuracy.",
          "During the COVID-19 pandemic, AI systems demonstrated their capacity under pressure: several models identified promising antiviral compounds within days of the SARS-CoV-2 genome being published, a process that would conventionally take years. Generative AI is now being used to design entirely novel molecules with desired properties — an approach called de novo drug design that was science fiction a decade ago.",
          "Industry analysts project that AI-powered drug discovery will save the pharmaceutical industry an estimated $26 billion annually by 2028, while simultaneously shortening average development cycles from 12 years to approximately 4. Biotech firms like Insilico Medicine, Recursion Pharmaceuticals, and AbSci are already advancing AI-designed molecules through Phase II clinical trials.",
        ],
      },
      {
        heading: "Surgical Robotics and AI Synchronization",
        content: [
          "Robotic surgery systems such as Intuitive Surgical's da Vinci have already demonstrated the value of precision-controlled instruments in the operating theatre. The next evolution — AI synchronization — takes this a step further. By integrating real-time machine learning models into the surgical control loop, these systems can detect and compensate for physiological tremor, optimize incision trajectories, and flag anatomical landmarks that may be invisible to the naked eye.",
          "AI-assisted surgical systems achieve sub-millimeter precision by processing sensor data at frequencies exceeding 1,000 Hz, making micro-corrections that no human surgeon could consciously execute. In robotic-assisted laparoscopic and prostatectomy procedures, AI-guided tremor correction has been associated with a 35% reduction in post-operative complications and significantly shorter recovery times.",
          "Looking ahead, AI synchronization platforms aim to integrate multimodal data streams — intraoperative imaging, patient vitals, tissue impedance measurements, and pre-operative imaging — into a unified situational awareness model. The surgical AI becomes, in essence, an always-alert co-pilot: augmenting the surgeon's decision-making with real-time probabilistic guidance.",
        ],
      },
      {
        heading: "Diagnostics and Early Detection",
        content: [
          "Perhaps the most immediately impactful application of AI in medicine is in diagnostic imaging. Convolutional neural networks trained on millions of annotated MRI, CT, and pathology slides are now reading medical images with accuracy that meets or exceeds that of board-certified radiologists in specific domains. A landmark 2020 Google Health study demonstrated that its AI model detected breast cancer from mammograms with 94.5% accuracy — outperforming the average radiologist by nearly 6 percentage points while reducing false positives by 11%.",
          "Beyond radiology, AI diagnostic tools are being deployed in dermatology (identifying melanoma from smartphone photos), ophthalmology (detecting diabetic retinopathy from fundus images), and cardiology (diagnosing arrhythmias from wearable ECG signals). The democratizing potential is enormous: AI-powered diagnostics could bring specialist-level screening to resource-limited settings where trained radiologists are scarce.",
          "Early detection remains the single most powerful predictor of treatment success for most cancers and chronic diseases. AI systems analyzing longitudinal patient data — combining imaging, genomics, proteomics, and wearable data — are beginning to predict disease onset months or years before clinical symptoms emerge, opening a new paradigm of proactive, preventive medicine.",
        ],
      },
      {
        heading: "Ethical Considerations and Future Outlook",
        content: [
          "The rapid advance of AI in biotechnology is not without profound ethical challenges. Data privacy is paramount — the genomic and health data that trains these models is among the most sensitive personal information imaginable. Regulatory frameworks governing AI in medical devices are evolving, with the FDA having cleared over 500 AI/ML-based medical devices as of 2025, while simultaneously developing more rigorous frameworks for continuously learning algorithms.",
          "Algorithmic bias represents a serious concern. AI models trained predominantly on data from specific ethnic or demographic populations may perform poorly — or even harmfully — when applied to underrepresented groups. Addressing this requires deliberate diversity in training datasets and ongoing post-deployment monitoring. The biotech and medical AI community is increasingly adopting 'model cards' and transparency frameworks to document limitations and intended use.",
          "Looking toward 2030, the consensus among leading researchers is that AI co-pilots will become standard in surgical suites, diagnostic centers, and drug development laboratories worldwide. The question is not whether AI will transform biotechnology — it already is — but whether regulatory bodies, healthcare systems, and society can adapt quickly enough to realize the full potential while effectively managing the risks.",
        ],
      },
      {
        heading: "Conclusion",
        content: [
          "AI is not replacing doctors, researchers, or surgeons — it is augmenting human capability in ways that were unimaginable even a decade ago. The future of biotechnology is a collaboration between human expertise and machine intelligence, each compensating for the other's limitations. Clinicians bring contextual judgment, empathy, and ethical reasoning; AI brings tireless pattern recognition, data synthesis, and probabilistic precision.",
          "For patients, this convergence promises earlier diagnoses, more effective treatments, safer surgeries, and therapies tailored to their unique biology. For researchers and practitioners, it offers tools that amplify their impact and reduce the cognitive burden of increasingly complex data environments. The age of AI-augmented medicine has arrived — and its potential to reduce human suffering is profound.",
        ],
      },
    ],
  },
  {
    id: "oncovac-cancer-vaccine",
    title: "AI-Generated Breakthrough: Universal Cancer Vaccine Oncovac",
    author: "Dr. Aisha Patel",
    authorInitials: "AP",
    date: "April 2, 2026",
    readTime: "6 min read",
    tag: "Medical Breakthrough",
    tagVariant: "blue",
    excerpt:
      "Discover how AI is powering Oncovac, a potentially universal cancer vaccine that could reshape cancer treatment worldwide — targeting multiple tumor types simultaneously.",
    heroImage: "/assets/generated/oncovac-hero.dim_1200x600.jpg",
    sections: [
      {
        heading: "Introduction",
        content: [
          "Cancer remains one of humanity's most devastating diseases, claiming nearly 10 million lives annually and affecting hundreds of millions more worldwide. Despite decades of progress, a universal cure has remained elusive — until now. Enter Oncovac, an AI-generated cancer vaccine that represents a paradigm shift in oncology. Powered by cutting-edge artificial intelligence, Oncovac is designed to teach the immune system to recognize and destroy cancer cells across a wide spectrum of tumor types. This is not a distant dream — it is a medical breakthrough unfolding in real time.",
          "The potential of AI in vaccine design has long been recognized, but Oncovac is among the first to translate that potential into a clinically viable candidate. By harnessing the power of deep learning, protein engineering, and molecular modeling, researchers have created a vaccine platform that could ultimately make cancer a manageable — or even curable — condition for millions of patients globally.",
        ],
      },
      {
        heading: "What is Oncovac?",
        content: [
          "Oncovac is a next-generation, multi-antigen cancer vaccine designed to elicit a broad and durable immune response against a wide range of tumor types. Unlike traditional cancer vaccines that target a single tumor-specific antigen, Oncovac employs a polyvalent approach — simultaneously targeting multiple cancer-associated antigens (CAAs) that are overexpressed across different cancer types, including lung, breast, colorectal, and pancreatic cancers.",
          "At its core, Oncovac consists of three principal components: a lipid nanoparticle (LNP) delivery system that safely transports mRNA payloads into immune cells; a cocktail of mRNA sequences encoding shared tumor antigens such as MAGE-A3, NY-ESO-1, and Survivin; and a built-in adjuvant component that amplifies the innate immune response, priming T-cells and B-cells for a powerful and sustained anti-tumor attack. The vaccine's mechanism mirrors that of successful mRNA COVID-19 vaccines but is uniquely engineered for the complex immunological landscape of cancer.",
        ],
      },
      {
        heading: "AI's Role in Designing Oncovac",
        content: [
          "The design of Oncovac would not have been possible without artificial intelligence. Traditional vaccine development is constrained by the sheer complexity of the human immune system and the vast combinatorial space of possible antigen sequences. AI breaks through these barriers by processing biological data at a scale and speed no human team could achieve.",
          "Using generative AI models trained on vast protein databases, researchers identified optimal antigen sequences with high immunogenicity and cross-reactivity across cancer types. AlphaFold-derived structural predictions enabled the team to model how each antigen would fold and present on the surface of cancer cells — a critical factor in vaccine efficacy. Reinforcement learning algorithms then iteratively refined the mRNA sequence design to maximize stability and minimize off-target immune activation. Molecular dynamics simulations, guided by AI, modeled vaccine-immune system interactions at atomic resolution, predicting binding affinities and T-cell receptor engagement with unprecedented accuracy. The result is a vaccine candidate designed with a precision and confidence that classical biochemical approaches simply cannot match.",
        ],
      },
      {
        heading: "Enhancing Efficacy",
        content: [
          "Even the most brilliantly designed vaccine requires optimization to achieve maximum real-world impact. Oncovac's development team has incorporated several strategies to enhance its therapeutic potency. First, the LNP delivery system has been engineered to selectively target dendritic cells — the immune system's master orchestrators — ensuring that the mRNA payload reaches the cells most capable of mounting a powerful anti-tumor response.",
          "Second, researchers are exploring the co-administration of Oncovac with immunomodulators such as checkpoint inhibitors (e.g., anti-PD-1 and anti-CTLA-4 antibodies), which release the immune system's natural brakes and amplify the vaccine-induced T-cell response. Early preclinical data suggest that this combination produces synergistic tumor regression effects far exceeding either agent alone. Third, nanoparticle surface modifications — guided by AI-optimized ligand design — are being tested to enhance cellular uptake and prolong antigen presentation, potentially extending the vaccine's duration of protective immunity.",
        ],
      },
      {
        heading: "Future Directions",
        content: [
          "The promise of Oncovac extends well beyond its current formulation. Researchers envision a future where Oncovac serves as a universal cancer prevention vaccine — administered prophylactically to high-risk individuals before malignancy develops, much like existing vaccines for hepatitis B and HPV prevent liver cancer and cervical cancer respectively.",
          "Looking further ahead, patient-specific versions of Oncovac — personalized neoantigen vaccines tailored to an individual's unique tumor mutation profile — represent a compelling next frontier. AI systems capable of rapidly sequencing a patient's tumor, identifying immunogenic neoantigens, and designing a bespoke vaccine within days could transform cancer treatment from a reactive battle into a precision-guided campaign. Combinations with CAR-T cell therapy, oncolytic viruses, and radioimmunotherapy are also actively being explored, with early data suggesting powerful synergies. The future of Oncovac is not a single drug — it is a platform.",
        ],
      },
      {
        heading: "Conclusion",
        content: [
          "Oncovac represents far more than a promising cancer vaccine — it is a proof of concept for what AI-driven medicine can achieve. By merging the power of machine learning, structural biology, and immunology, researchers have designed a vaccine candidate that could one day consign cancer to the same category as smallpox: a once-devastating disease ultimately conquered by human ingenuity. The road from promising candidate to approved universal vaccine is long, but the scientific foundation has never been stronger. As AI continues to mature and biological datasets grow richer, breakthroughs like Oncovac will become not the exception, but the norm. The future of medicine is here — and it is being written in code.",
        ],
      },
    ],
  },
];

const relatedArticles = [
  {
    title: "CRISPR Meets Machine Learning: Gene Editing at Scale",
    author: "Dr. James Okoye",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    excerpt:
      "How ML-guided CRISPR systems are achieving unprecedented specificity in gene editing, reducing off-target effects by up to 90% and opening new frontiers in inherited disease therapy.",
    tag: "Genomics",
  },
  {
    title: "Neural Interfaces: Bridging Brain and Machine with AI",
    author: "Dr. Priya Nair",
    date: "Jan 22, 2026",
    readTime: "7 min read",
    excerpt:
      "Exploring how AI decoding algorithms are transforming brain-computer interfaces, enabling paralyzed patients to control robotic limbs and communicate through thought alone.",
    tag: "Neurotechnology",
  },
];

function TagBadge({ variant, label }: { variant: string; label: string }) {
  if (variant === "green") {
    return (
      <span className="status-green text-xs font-semibold px-2.5 py-0.5 rounded-full">
        {label}
      </span>
    );
  }
  return (
    <span className="status-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">
      {label}
    </span>
  );
}

function BlogCard({
  post,
  onClick,
  index,
}: {
  post: BlogPost;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card
        className="border-border shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer group hover:-translate-y-1"
        onClick={onClick}
        data-ocid={`blog.item.${index + 1}`}
      >
        <CardContent className="p-0">
          {post.heroImage ? (
            <div className="w-full h-44 overflow-hidden rounded-t-xl">
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="w-full h-44 rounded-t-xl bg-gradient-to-br from-teal/20 to-primary/10 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-teal"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
          )}
          <div className="p-5 space-y-3">
            <TagBadge variant={post.tagVariant} label={post.tag} />
            <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center text-white text-[10px] font-bold">
                  {post.authorInitials}
                </div>
                <span className="font-medium text-foreground">
                  {post.author}
                </span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{post.date}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ArticleView({
  post,
  onBack,
}: {
  post: BlogPost;
  onBack: () => void;
}) {
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground -ml-1"
        data-ocid="blog.secondary_button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all articles
      </Button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TagBadge variant={post.tagVariant} label={post.tag} />
        </div>
        <h1 className="text-3xl font-bold text-foreground leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold">
              {post.authorInitials}
            </div>
            <div>
              <p className="font-medium text-foreground text-xs">
                {post.author}
              </p>
              <p className="text-xs">Senior Researcher, BioMind AI</p>
            </div>
          </div>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Hero */}
      {post.heroImage ? (
        <div className="w-full h-64 rounded-xl overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-56 rounded-xl bg-gradient-to-br from-teal/20 to-primary/10 border border-border flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-teal/20 flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-teal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-teal">AI in Biotechnology</p>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-sm max-w-none space-y-8">
        {post.sections.map((section, si) => (
          <motion.section
            key={section.heading}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.06, duration: 0.35 }}
          >
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">
              {section.heading}
            </h2>
            {section.content.map((para, pi) => (
              <p
                key={`${section.heading}-p${pi}`}
                className="text-sm text-foreground leading-relaxed mb-3"
              >
                {para}
              </p>
            ))}
          </motion.section>
        ))}
      </article>

      {/* Related Articles */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">
          Related Articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedArticles.map((article) => (
            <Card
              key={article.title}
              className="border-border shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
              data-ocid="blog.card"
            >
              <CardContent className="p-5 space-y-3">
                <span className="status-blue text-xs font-semibold px-2 py-0.5 rounded-full">
                  {article.tag}
                </span>
                <h4 className="text-sm font-semibold text-foreground leading-snug">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Blog() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPost = selectedId
    ? (blogs.find((b) => b.id === selectedId) ?? null)
    : null;

  return (
    <AnimatePresence mode="wait">
      {selectedPost ? (
        <ArticleView
          key={selectedPost.id}
          post={selectedPost}
          onBack={() => setSelectedId(null)}
        />
      ) : (
        <motion.div
          key="listing"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="max-w-5xl mx-auto space-y-8"
          data-ocid="blog.section"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">BioMind Blog</h1>
            <p className="text-muted-foreground text-sm">
              Latest insights, breakthroughs, and research from the frontier of
              AI-powered medicine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
                onClick={() => setSelectedId(post.id)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
