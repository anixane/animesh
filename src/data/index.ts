import { Project, Experience, Patent } from '../types';

// Project data
export const projects: Project[] = [
  {
    id: 'adobe-sensei',
    title: 'Adobe Sensei AI Services',
    description: 'Led the development of AI-powered content analysis services',
    longDescription: 'Spearheaded the development of Adobe Sensei AI services that revolutionized content analysis and processing. Implemented machine learning algorithms for automated content tagging, smart cropping, and style transfer features. The project improved content processing efficiency by 60% and is now used by millions of Adobe Creative Cloud users.',
    technologies: ['Python', 'TensorFlow', 'AWS', 'Kubernetes'],
    role: 'Lead Developer',
    duration: '2022 - Present',
    impact: 'Improved content processing efficiency by 60%, serving millions of users',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80',
    company: 'Adobe'
  },
  {
    id: 'creative-cloud',
    title: 'Creative Cloud Collaboration',
    description: 'Built real-time collaboration features for Creative Cloud',
    longDescription: 'Architected and implemented real-time collaboration features for Adobe Creative Cloud applications. Developed a robust WebSocket-based system handling concurrent edits, conflict resolution, and live previews. The system now powers collaborative editing across Photoshop, Illustrator, and other Creative Cloud apps.',
    technologies: ['WebSocket', 'Node.js', 'Redis', 'React'],
    role: 'Senior Developer',
    duration: '2021 - 2022',
    impact: 'Enabled real-time collaboration for 20+ million Creative Cloud users',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80',
    company: 'Adobe'
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure Optimization',
    description: 'Optimized cloud infrastructure reducing costs by 35%',
    longDescription: 'successfully migrated an on-premise database to the Azure cloud solution and designed various Microsoft Azure solutions for system components. My expertise lies in Azure SQL DB, Azure Data Bricks, elastic pool, and elastic search, with a proven ability to optimize Azure SQL DB for improved report performance. I have also applied my knowledge of .Net, MVC, AngularJS, TypeScript, Power BI API, and other Azure services such as Redis, file storage, and KeyVault to develop a robust web application.',
    technologies: ['Azure', 'Web Development', 'Python', 'SQL', 'Power BI'],
    role: 'Software Engineer',
    duration: 'Sep, 2018 - Feb, 2020',
    impact: '35% reduction in cloud costs, 99.99% system reliability',
    image: 'logos/maq-software.svg',
    company: 'MAQ Software (Microsoft External)'
  }
];

// Experience data
export const experiences: Experience[] = [
  {
    id: 'adobe',
    company: 'Adobe',
    role: 'Computer Scientist 2 (SDE3)',
    duration: '2021 - Present',
    description: 'Leading AI/ML initiatives in Adobe Sensei and Creative Cloud',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png',
    longDescription: 'Leading the development of AI-powered features in Adobe Sensei and Creative Cloud. Spearheading innovation in content analysis, automated workflows, and creative tools. Filed multiple patents and received recognition for technical excellence.',
    location: 'San Jose, CA',
    teamSize: '15+ engineers',
    techStack: ['Python', 'TensorFlow', 'AWS', 'React', 'Node.js'],
    achievements: [
      'Led development of AI Assistant in Adobe Acrobat',
      'Filed 2+ patents',
      'Received Adobe Impact Award'
    ],
    roleProgression: [
      {
        title: 'Computer Scientist 2 (SDE3)',
        period: 'Jan 2025 - Present',
        achievements: ['Leading innovative AI feature development', 'Filed 2 patents']
      },
      {
        title: 'Computer Scientist 1 (SDE2)',
        period: 'Aug 2022 - Dec 2024',
        achievements: ['Developed Acrobat AI Assistant features in multi-language', 'Scaled AI Assistant to 10M+ users']
      },
      {
        title: 'Member of Technical Staff 2',
        period: 'March 2021 - Jul 2022',
        achievements: ['Developed ML model optimization framework', 'Reduced inference time by 43.5% and cost by 52%']
      }
    ]
  },
  {
    id: 'maq-software',
    company: 'MAQ Software (Microsoft External)',
    role: 'Software Engineer II',
    duration: '2018 - 2021',
    description: 'Developed cloud infrastructure and distributed systems',
    logo: 'logos/maq-software.svg',
    longDescription: 'Developed scalable cloud infrastructure and distributed systems for MAQ Software. Led initiatives in performance optimization and system reliability. Contributed to core services used by enterprise customers worldwide.',
    location: 'Redmond, WA',
    teamSize: '10+ engineers',
    techStack: ['C#', '.NET', 'Azure', 'Kubernetes'],
    achievements: [
      'Optimized cloud costs by 40%',
      'Improved system reliability to 99.99%',
      'Led team of 5 engineers'
    ],
    roleProgression: [
      {
        title: 'Software Engineer II',
        period: 'Mar 2020 - Feb 2021',
        achievements: ['Led team of 5 engineers', 'Optimized cloud infrastructure']
      },
      {
        title: 'Software Engineer I',
        period: 'Sep 2018 - Feb 2020',
        achievements: ['Implemented distributed logging system', 'Reduced deployment time by 50%']
      }
    ]
  }
];

// Patent data
export const patents: Patent[] = [
  {
    id: 'content-analysis',
    title: "Improving contextual entity attribution using LLM hidden states",
    number: "P13667-US",
    description: "A novel hybrid approach for attributing entity-based answers, generated for a query to the input contract document, in a contextual setting. We propose a novel technique that leverages the hidden states of Large Language Models, leading to a substantial improvement in entity attribution for contracts.",
    status: "Pending",
    filingDate: "February 27, 2025",
    inventors: ["Animesh Kumar", "Anirudh Phukan", "Apoorv Saxena", "Koustava Goswami"],
    abstract: "The patent describes techniques for attribution in contextual question answering using machine-learning hidden states. ​ A processing device receives a document and an answer generated by a machine-learning model, such as a large language model (LLM), based on the document's content. ​ The answer is decomposed into answer tokens, which are attributed to corresponding document tokens using hidden state representations and a cosine similarity matrix. ​ This enables precise mapping of answer tokens to their source document tokens, improving attribution granularity and trustworthiness. ​ The system generates annotated documents with visual indications, such as color coding or interactive links, to associate answer tokens with their corresponding document tokens. These techniques enhance the reliability and efficiency of contextual question-answering systems by providing detailed attribution for long-form, abstractive answers.",
    benefits: [
      "Improved attribution granularity for long-form answers", 
      "Enhanced trustworthiness of generated content", 
      "Efficient mapping of answer tokens to document tokens", 
      "Visual indications for easy verification of attributions", 
      "Reduced manual effort in verifying source reliability", 
      "Support for multi-modal content attribution (text, images, videos, audio)", 
      "Optimized computational efficiency using hidden states of LLMs", 
      "Scalable and precise attribution for contextual question answering"
      ],
      productIntegration: {
        name: "Adobe Acrobat",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Acrobat_DC_logo_2020.svg/512px-Adobe_Acrobat_DC_logo_2020.svg.png",
        description: "Experience smarter document handling with Adobe Acrobat Reader's integrated AI assistant, enabling interactive PDF chats."
      },
    relatedDocuments: [
      {
        title: "Patent Application PDF",
        url: "https://drive.google.com/file/d/1yxboAyskiP9Yd3sWoAKrhzc5qjiG_vC5/view?usp=sharing"
      }
    ]
  },
  {
    id: 'image-processing',
    title: "FINE-GRAINED ATTRIBUTION FOR DOCUMENT QUESTION ANSWERING",
    number: "1062P12405US",
    description: "Given a generated answer for a question on a provided document or collection of documents, extract parts of the document that provide support, evidence, additional details, or related content and the like that allow the reader to quickly explore her area of interest and build trust in the answering system.",
    status: "Pending",
    filingDate: "December 04, 2023",
    inventors: ["Animesh Kumar", "Varun Manjunatha", "Koustava Goswami", "Surabhi Bhargava", "Sruthi Madapoosi Ravi", "Nedim Lipka", "Joseph Barrow", "Inderjeet Nair", "Christopher Tensmeyer", "Balaji Vasan Srinivasan", "Ashutosh Mehra", "Ani Nenkova", "Alexa Siu", "Abhilasha Sancheti"],
    abstract: "This patent application unveils an advanced method for processing and optimizing text attributions using a novel combination of retrieval techniques and attribution methods. The technique can automatically enhance the precision and recall of information sourcing, provide inline attributions, and optimize relevance without user intervention. The system learns from extracted atomic facts to develop personalized scoring models for different types of attributions. Moreover, the approach employs an attribution recall expansion concept for broader retrieval in extended scopes and tailors attributions to various user experiences, offering text chunks representing specific categories.",
    benefits: [  
      "Flexibility: The configurable pipeline of attribution methods allows for customization based on specific requirements or use cases.",  
      "Enhanced Performance: The high-performing combination of retrieval techniques for attribution can lead to better precision and accuracy in providing relevant information.",  
      "Fine-tuned Results: Inline attribution via custom prompt and post-processing can result in more targeted and relevant outputs.",  
      "Fact-based Scoring: The use of fact-based attribution that scores relevance based on extracted atomic facts can lead to more reliable and trustworthy results.",  
      "Expanded Reach: The attribution recall expansion concept allows for retrieval in extended scopes such as related document collections or the Web, thereby broadening the range of available information.",  
      "User-Centric Approach: The tailored attributions cater to various user experiences, enhancing the usability and applicability of the system. Specific chunks representing text categories such as examples, definitions, or readability scores can greatly improve user understanding and engagement."  
    ],
    productIntegration: {
      name: "Adobe Acrobat",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Acrobat_DC_logo_2020.svg/512px-Adobe_Acrobat_DC_logo_2020.svg.png",
      description: "Elevating your PDF experience with an AI assistant for real-time document interaction and consultation."
    },
    relatedDocuments: [
      {
        title: "Patent Application",
        url: "https://drive.google.com/file/d/1rD7C6wp2tQd0Xy6hsHsuANsk6H5EGsWo/view?usp=sharing"
      }
    ]
  }
]; 