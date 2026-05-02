import {
  Clock,
  GitBranch,
  ChartBar,
  Briefcase,
  Robot,
  CurrencyDollar,
  Users,
  GraduationCap,
  TrendUp,
  GlobeHemisphereWest,
  MapPin,
  WarningCircle,
} from "@phosphor-icons/react"

export interface NodeData {
  id: string
  title: string
  icon: any
  color: string
  description: string
  keyPoints: string[]
  keyData: string
  isCenter?: boolean
}

export interface NodeLayout {
  id: string
  centerX: number
  centerY: number
  width: number
  height: number
}

export interface ConceptLink {
  from: string
  to: string
  label: string
  labelOffsetX?: number
  labelOffsetY?: number
}

export const conceptCanvas = {
  width: 1180,
  height: 1040,
}

export const nodesData: NodeData[] = [
  {
    id: "center",
    title: "IDAP-2024-246",
    icon: GraduationCap,
    color: "primary",
    description:
      "La Ingeniería en Desarrollo de Aplicaciones del TecNM Campus Chetumal se presenta en la investigación como una respuesta institucional ante la demanda de profesionales capaces de cubrir el ciclo completo de aplicaciones web, móviles y en la nube.",
    keyPoints: [
      "Programa escolarizado de nivel licenciatura aprobado por el TecNM en 2024",
      "Enfoque explícito en aplicaciones web, móviles y cloud",
      "Perfil orientado a productos digitales completos y al usuario final",
      "La investigación lo organiza en siete ejes: evolución, origen, comparación, mercado, IA, salarios y ámbitos profesionales",
      "Su pertinencia se apoya en fuentes como BLS, Hireline, Glassdoor, CodersLink y TecNM",
    ],
    keyData:
      "La investigación concluye que la demanda de este perfil es estructural y no coyuntural, incluso en la era de la inteligencia artificial generativa.",
    isCenter: true,
  },
  {
    id: "timeline",
    title: "Evolución histórica",
    icon: Clock,
    color: "coral",
    description:
      "La carrera se entiende como resultado de siete décadas de evolución tecnológica, económica y educativa, desde los lenguajes de alto nivel hasta la inteligencia artificial generativa.",
    keyPoints: [
      "1950-1975: FORTRAN, COBOL, C y nacimiento de la ingeniería de software",
      "1975-1995: software comercial, PC, C++, Python y Java",
      "1991-2007: Web, JavaScript, PHP, MySQL y currículos ACM/IEEE",
      "2007-2020: iPhone, Android, App Store, SaaS y cómputo en la nube",
      "2022-2024: ChatGPT, GitHub Copilot y formalización de IDAP-2024-246",
    ],
    keyData:
      "La clave 246 posiciona al plan IDAP entre los programas más recientes del sistema TecNM.",
  },
  {
    id: "origin",
    title: "Brecha de mercado",
    icon: MapPin,
    color: "purple",
    description:
      "IDAP surge porque el mercado requiere profesionistas que dominen aplicaciones orientadas al usuario final sin centrarse únicamente en redes, sistemas operativos o hardware de bajo nivel.",
    keyPoints: [
      "La explosión móvil de iPhone y Android generó demanda de desarrolladores especializados",
      "La nube y el modelo SaaS desplazaron el foco hacia aplicaciones distribuidas",
      "La pandemia aceleró la digitalización en comercio, salud, educación y gobierno",
      "La economía de aplicaciones digitales exige perfiles web, móvil y cloud",
      "La carrera responde a una necesidad laboral específica, no a un simple cambio de nombre",
    ],
    keyData:
      "El documento resume esta brecha como la necesidad de dominar el ciclo completo de desarrollo de aplicaciones modernas.",
  },
  {
    id: "analysis",
    title: "Comparación internacional",
    icon: GlobeHemisphereWest,
    color: "purple",
    description:
      "La investigación compara el perfil IDAP con programas equivalentes en Estados Unidos, México y otros mercados globales para ubicar fortalezas y oportunidades.",
    keyPoints: [
      "En EE. UU. el equivalente se alinea con Software Engineering o Computer Science con concentración en desarrollo",
      "El BLS reporta salario mediano anual de 133,080 USD para software developers en mayo de 2024",
      "México combina TecNM, UNAM, IPN, ITESM y universidades privadas con enfoques distintos",
      "Quintana Roo aparece como región relevante por salarios TI y demanda emergente",
      "El trabajo remoto permite competir en mercados de EE. UU., Canadá y Europa desde el sureste mexicano",
    ],
    keyData:
      "El BLS proyecta 15% de crecimiento laboral para desarrolladores, QA analysts y testers entre 2024 y 2034.",
  },
  {
    id: "market",
    title: "Mercado laboral 2023-2025",
    icon: Briefcase,
    color: "green",
    description:
      "El mercado laboral del perfil IDAP muestra demanda sostenida, movilidad alta y oportunidades específicas para Quintana Roo por turismo digital, nearshoring y escasez de talento local.",
    keyPoints: [
      "BLS proyecta cerca de 129,200 aperturas anuales en software development, QA y testing",
      "Hireline reporta salario promedio TI en México de 32,854 MXN mensuales netos en 2024",
      "El 94% del talento tecnológico prefiere modalidades flexibles para asistir a oficina",
      "Java, .NET, SAP, TypeScript, Swift y Azure figuran entre habilidades o ecosistemas valiosos",
      "Nuevo León y Quintana Roo lideran salarios tecnológicos por demanda alta y oferta limitada",
    ],
    keyData:
      "Para TecNM Chetumal, la estrategia de mayor retorno señalada es orientar el perfil hacia trabajo remoto nacional e internacional.",
  },
  {
    id: "ai-challenges",
    title: "Retos en la era de IA",
    icon: Robot,
    color: "blue",
    description:
      "La IA generativa no elimina la relevancia del ingeniero de aplicaciones: transforma sus tareas y eleva la exigencia hacia arquitectura, integración, seguridad y criterio de producto.",
    keyPoints: [
      "Integrar LLMs, visión por computadora, modelos predictivos, RAG y bases vectoriales",
      "Diseñar arquitecturas cloud-native con Docker, Kubernetes, AWS, Azure o GCP",
      "Aplicar DevSecOps, OWASP, OAuth 2.0, Zero Trust y análisis estático de seguridad",
      "Crear experiencias multiplataforma con Flutter, React Native o Tauri",
      "Optimizar rendimiento, consumo de recursos, Web Vitals y sostenibilidad del software",
    ],
    keyData:
      "La investigación advierte que los roles rutinarios de codificación son los más vulnerables, mientras el perfil IDAP queda mejor posicionado por su enfoque integral.",
  },
  {
    id: "salary",
    title: "Rangos salariales",
    icon: CurrencyDollar,
    color: "green",
    description:
      "Los rangos salariales varían por mercado, experiencia, certificaciones, tecnologías e inglés, pero la investigación ubica al perfil IDAP en un campo con retorno económico alto.",
    keyPoints: [
      "Junior en México: 16,000-22,000 MXN mensuales",
      "Mid-level en México: 25,000-40,000 MXN mensuales",
      "Senior en México: 45,000-80,000 MXN mensuales",
      "Especialista IA/Cloud en México: 55,000-100,000 MXN mensuales",
      "Remoto internacional: de 1,500 a 10,000 USD mensuales según nivel y especialidad",
    ],
    keyData:
      "El inglés técnico puede multiplicar hasta cuatro veces el salario de un profesional TI en México, según la fuente citada por la investigación.",
  },
  {
    id: "professional-fields",
    title: "Ámbitos Profesionales",
    icon: Users,
    color: "green",
    description:
      "El egresado IDAP cuenta con un perfil versátil para insertarse en áreas técnicas, de producto, consultoría, emprendimiento, educación y trabajo internacional.",
    keyPoints: [
      "Desarrollo web frontend, backend y fullstack",
      "Aplicaciones móviles multiplataforma",
      "Cloud engineering, bases de datos, arquitectura de datos, QA y DevOps",
      "Mercadotecnia digital, growth engineering, startups y consultoría TI",
      "Docencia, investigación, trabajo remoto internacional y perfil de nómada digital",
    ],
    keyData:
      "El documento enumera diez ámbitos profesionales principales y destaca que desarrollo web es el campo con mayor número de vacantes.",
  },
  {
    id: "differentiation",
    title: "Diferenciación académica",
    icon: GitBranch,
    color: "coral",
    description:
      "El perfil IDAP se diferencia de carreras afines por su foco en construir productos digitales completos, desde interfaz y backend hasta despliegue en producción.",
    keyPoints: [
      "IDAP: ciclo de vida de aplicaciones web, móvil y cloud",
      "ISIC: infraestructura, redes y administración de sistemas",
      "Ciencias Computacionales: algoritmia, matemáticas formales e investigación",
      "Materias distintivas: frameworks frontend, apps móviles, despliegue y mercadotecnia digital",
      "Mercado objetivo: startups, agencias digitales, fintech, hospitalidad tech y nearshoring",
    ],
    keyData:
      "La investigación lo sintetiza como un perfil más cercano al desarrollo de producto digital que a la administración tradicional de TI.",
  },
  {
    id: "trends",
    title: "Nuevas tendencias",
    icon: TrendUp,
    color: "blue",
    description:
      "Además de las actividades tradicionales, el documento identifica tendencias que están redefiniendo el trabajo del desarrollador de aplicaciones.",
    keyPoints: [
      "IA generativa y asistentes de código como Cursor, Bolt.new y GitHub Copilot",
      "DevSecOps para integrar seguridad desde el diseño y el CI/CD",
      "Cloud-native, contenedores y conexión de sistemas centrales con nubes públicas",
      "Low-code y no-code para acelerar aplicaciones empresariales",
      "El rol técnico se desplaza hacia integración, arquitectura, validación y criterio de negocio",
    ],
    keyData:
      "La investigación cita proyecciones de crecimiento fuerte para IA generativa y low-code hacia 2030.",
  },
  {
    id: "prospect",
    title: "Prospectiva 2030",
    icon: ChartBar,
    color: "purple",
    description:
      "Las conclusiones plantean que el programa es pertinente para Chetumal y Quintana Roo si el egresado fortalece inglés, certificaciones cloud, portafolio y trabajo remoto.",
    keyPoints: [
      "IDAP cubre segmentos de alto crecimiento: web, móvil y cloud",
      "Quintana Roo combina turismo tech, nearshoring, salarios altos y escasez de talento especializado",
      "El inglés técnico es el principal habilitador de oportunidades internacionales",
      "Certificaciones cloud y portafolio en GitHub aumentan competitividad",
      "Para 2030 se proyecta déficit global de desarrolladores y mayores salarios senior en México",
    ],
    keyData:
      "La conclusión central es que la IA no desplazará al ingeniero de aplicaciones bien formado; lo hará más productivo, versátil y valioso.",
  },
  {
    id: "critical-conclusion",
    title: "Conclusión: ¿qué le falta?",
    icon: WarningCircle,
    color: "blue",
    description:
      "La carrera no se considera deficiente; la investigación la presenta como pertinente y alineada con el mercado. Su punto débil está en lo que debe reforzarse para que el egresado aproveche realmente las oportunidades regionales e internacionales.",
    keyPoints: [
      "Fortalecer inglés técnico como requisito práctico para nearshoring y trabajo remoto",
      "Integrar certificaciones cloud y de desarrollo moderno desde la trayectoria académica",
      "Aumentar proyectos reales, portafolio en GitHub y vinculación con empresas locales",
      "Actualizar continuamente contenidos de IA aplicada, DevSecOps, datos y cloud-native",
      "Conectar mejor el potencial de Quintana Roo con prácticas, incubación y empleo tecnológico",
    ],
    keyData:
      "No le falta pertinencia; le falta asegurar ejecución práctica constante: inglés, certificaciones, proyectos reales y vinculación empresarial para que el plan no se quede solo en intención curricular.",
  },
]

export const centerNode = nodesData.find((n) => n.isCenter)!
export const childNodes = nodesData.filter((n) => !n.isCenter)

export const conceptNodeLayouts: NodeLayout[] = [
  { id: "center", centerX: 590, centerY: 70, width: 300, height: 112 },
  { id: "timeline", centerX: 160, centerY: 220, width: 230, height: 116 },
  { id: "differentiation", centerX: 445, centerY: 220, width: 250, height: 116 },
  { id: "market", centerX: 735, centerY: 220, width: 250, height: 116 },
  { id: "ai-challenges", centerX: 1020, centerY: 220, width: 245, height: 116 },
  { id: "origin", centerX: 160, centerY: 410, width: 230, height: 116 },
  { id: "analysis", centerX: 445, centerY: 410, width: 250, height: 116 },
  { id: "salary", centerX: 735, centerY: 410, width: 250, height: 116 },
  { id: "trends", centerX: 1020, centerY: 410, width: 245, height: 116 },
  { id: "professional-fields", centerX: 350, centerY: 650, width: 280, height: 126 },
  { id: "prospect", centerX: 830, centerY: 650, width: 280, height: 126 },
  { id: "critical-conclusion", centerX: 590, centerY: 875, width: 340, height: 132 },
]

export const conceptLinks: ConceptLink[] = [
  { from: "center", to: "timeline", label: "se entiende por", labelOffsetX: -12 },
  { from: "center", to: "differentiation", label: "se define frente a", labelOffsetY: -10 },
  { from: "center", to: "market", label: "se justifica por", labelOffsetY: -10 },
  { from: "center", to: "ai-challenges", label: "se actualiza ante", labelOffsetX: 12 },
  { from: "timeline", to: "origin", label: "converge en" },
  { from: "differentiation", to: "analysis", label: "se compara en" },
  { from: "market", to: "salary", label: "se refleja en" },
  { from: "ai-challenges", to: "trends", label: "impulsa" },
  { from: "origin", to: "professional-fields", label: "prepara para", labelOffsetX: 16 },
  { from: "analysis", to: "professional-fields", label: "orienta", labelOffsetX: -18, labelOffsetY: 8 },
  { from: "salary", to: "prospect", label: "proyecta", labelOffsetX: 16, labelOffsetY: 8 },
  { from: "trends", to: "prospect", label: "marca", labelOffsetX: -16 },
  { from: "professional-fields", to: "prospect", label: "culmina en", labelOffsetY: 22 },
  { from: "prospect", to: "critical-conclusion", label: "se evalúa en", labelOffsetX: 24 },
]
