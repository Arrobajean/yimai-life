import { BlogPost, BlogCategory, EditorTemplate } from '../types/blog';

const STORAGE_KEY = 'yimailife_blog_posts_v1';
const DRAFT_STORAGE_KEY = 'yimailife_editor_draft_auto';

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: '1', name: 'Salud y Bienestar', slug: 'salud-bienestar', description: 'Consejos de vida saludable y terapias preventivas', color: '#1E4D2B' },
  { id: '2', name: 'Terapia Láser', slug: 'terapia-laser', description: 'Avances científicos y aplicaciones del láser infrarrojo', color: '#2E7D3E' },
  { id: '3', name: 'Acupuntura y MTC', slug: 'acupuntura-mtc', description: 'Medicina Tradicional China y puntos de energía', color: '#D4541A' },
  { id: '4', name: 'Guías de Uso', slug: 'guias-de-uso', description: 'Tutoriales paso a paso de nuestros dispositivos', color: '#3B82F6' },
  { id: '5', name: 'Casos y Testimonios', slug: 'casos-testimonios', description: 'Experiencias reales de mejora en calidad de vida', color: '#8B5CF6' }
];

export const EDITOR_TEMPLATES: EditorTemplate[] = [
  {
    id: 'guia-salud',
    name: 'Guía Clínica / Salud',
    description: 'Estructura con introducción médica, beneficios, tabla comparativa, consejos y llamada a la acción.',
    icon: 'BookOpen',
    defaultTitle: 'Guía Integral: Beneficios de la Fotobiomodulación en el Hogar',
    defaultExcerpt: 'Descubre cómo la terapia de luz de baja intensidad ayuda a la regeneración celular y el alivio del dolor crónico.',
    defaultCategory: 'Terapia Láser',
    content: `
      <h2>Introducción a la Terapia de Luz</h2>
      <p>La fotobiomodulación (PBMT) ha demostrado ser una de las herramientas no invasivas más revolucionarias para el bienestar diario. A través de longitudes de onda específicas, estimula las mitocondrias celulares para acelerar la recuperación.</p>
      
      <div class="editor-callout editor-callout-info">
        <p><strong>Dato Clínico:</strong> Las longitudes de onda entre 650nm y 808nm son las más efectivas para penetrar tejidos superficiales y profundos sin generar calor excesivo.</p>
      </div>

      <h3>Principales Beneficios Comprobados</h3>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Estimulación de la producción de ATP celular (+35%).</p></div></li>
        <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Reducción notable de la inflamación y rigidez articular.</p></div></li>
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div><p>Mejora de la microcirculación sanguínea local.</p></div></li>
      </ul>

      <h3>Comparativa de Parámetros</h3>
      <table>
        <thead>
          <tr>
            <th>Parámetro</th>
            <th>Láser 650 nm</th>
            <th>Láser 808 nm</th>
            <th>Efecto Principal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Penetración</strong></td>
            <td>Superficial (2-3 mm)</td>
            <td>Profunda (4-6 cm)</td>
            <td>Tejido conjuntivo y óseo</td>
          </tr>
          <tr>
            <td><strong>Aplicación</strong></td>
            <td>Acupuntura, Piel</td>
            <td>Articulaciones, Músculos</td>
            <td>Alivio del dolor profundo</td>
          </tr>
          <tr>
            <td><strong>Tiempo Sesión</strong></td>
            <td>15-20 minutos</td>
            <td>15-30 minutos</td>
            <td>Regeneración tisular</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <p>"La constancia en las aplicaciones diarias marca la diferencia en los resultados a mediano plazo."</p>
      </blockquote>

      <h3>Recomendaciones Prácticas</h3>
      <ol>
        <li>Limpiar la zona antes de cada aplicación para maximizar la absorción fotónica.</li>
        <li>Mantener la sonda perpendicular a la piel con contacto suave.</li>
        <li>Hidratarse adecuadamente antes y después de cada tratamiento.</li>
      </ol>
    `
  },
  {
    id: 'tutorial-dispositivo',
    name: 'Tutorial de Producto / Dispositivo',
    description: 'Paso a paso con video explicativo, checklist de verificación y preguntas frecuentes.',
    icon: 'Layers',
    defaultTitle: 'Cómo Usar tu Reloj Láser Semirrecargable Paso a Paso',
    defaultExcerpt: 'Instrucciones claras y directas para configurar y sacar el máximo provecho de tu equipo Yimai Life desde el primer día.',
    defaultCategory: 'Guías de Uso',
    content: `
      <h2>Configuración Inicial del Dispositivo</h2>
      <p>Bienvenido a tu nuevo equipo Yimai Life. Sigue estos sencillos pasos para comenzar tu primera sesión de manera segura y óptima.</p>

      <div class="editor-callout editor-callout-tip">
        <p><strong>Consejo de Uso:</strong> Se recomienda realizar la primera sesión por la mañana, idealmente 30 minutos antes del desayuno con un vaso de agua tibia.</p>
      </div>

      <h3>Pasos para la Primera Sesión</h3>
      <ol>
        <li><strong>Carga Completa:</strong> Conecta el cable USB magnético durante al menos 2 horas antes del primer encendido.</li>
        <li><strong>Colocación en la Muñeca:</strong> Ajusta la correa en la muñeca izquierda, alineando los diodos con la arteria radial.</li>
        <li><strong>Sonda Nasal (Opcional):</strong> Inserta el adaptador nasal con los protectores de silicona limpios.</li>
        <li><strong>Selección de Modo:</strong> Presiona el botón de encendido y selecciona el modo de potencia estándar (Nivel 2).</li>
      </ol>

      <div class="editor-callout editor-callout-warning">
        <p><strong>Precaución:</strong> No mire directamente al haz láser sin la debida protección ocular o los aplicadores puestos.</p>
      </div>
    `
  },
  {
    id: 'articulo-noticia',
    name: 'Artículo de Novedad / Lanzamiento',
    description: 'Diseñado para anuncios, lanzamientos de novedades o eventos de la marca.',
    icon: 'Sparkles',
    defaultTitle: 'Nueva Generación de Dispositivos Yimai Life 2026',
    defaultExcerpt: 'Presentamos nuestras últimas innovaciones en tecnología de fotobiomodulación certificada.',
    defaultCategory: 'Salud y Bienestar',
    content: `
      <h2>Innovación que Transforma tu Salud</h2>
      <p>Estamos orgullosos de presentar la nueva línea de productos diseñados para brindar bienestar profesional directamente en la comodidad de tu hogar.</p>
      
      <p>Con algoritmos inteligentes de modulación de pulso y ergonomía mejorada, nuestra nueva serie lleva la terapia biofotónica al siguiente nivel.</p>
    `
  }
];

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'guia-fotobiomodulacion-terapia-laser-hogar',
    title: 'Guía Completa: Beneficios de la Fotobiomodulación y Terapia Láser en el Hogar',
    subtitle: 'La ciencia detrás de la regeneración celular no invasiva y el alivio natural del dolor',
    excerpt: 'Descubre cómo la terapia de luz de baja intensidad (LLLT) estimula las células mitocondriales, reduce la inflamación y optimiza tu vitalidad diaria sin efectos secundarios.',
    category: 'Terapia Láser',
    tags: ['Láser 650nm', 'Fotobiomodulación', 'Salud Celular', 'Alivio del Dolor', 'Bienestar'],
    author: {
      name: 'Dra. Elena Vázquez',
      role: 'Especialista en Medicina Integrativa & Biofotónica',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
    },
    status: 'published',
    publishedAt: '2026-08-20T10:00:00.000Z',
    updatedAt: '2026-08-25T14:30:00.000Z',
    readingTime: 6,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    coverCaption: 'Terapia de fotobiomodulación aplicada en puntos estratégicos de acupuntura',
    seoTitle: 'Guía de Fotobiomodulación y Láser Terapéutico | Yimai Life',
    seoDescription: 'Aprende los fundamentos científicos y aplicaciones de la terapia láser no invasiva para la salud articular, microcirculación y energía celular.',
    content: `
      <p class="lead">La <strong>fotobiomodulación (PBMT)</strong>, históricamente conocida como terapia láser de baja intensidad (LLLT), ha pasado de ser un tratamiento exclusivo de clínicas de alta tecnología a una solución accesible, segura y sumamente eficaz para el cuidado personal diario.</p>

      <h2>¿Cómo Funciona la Energía Fotónica en Nuestras Células?</h2>
      <p>Cuando los fotones en el espectro de luz roja (650 nm) e infrarroja cercana (808 nm) entran en contacto con el tejido biológico, son absorbidos por una enzima clave en las mitocondrias llamada <em>Citocromo C Oxidasa</em>.</p>
      
      <div class="editor-callout editor-callout-info">
        <p><strong>Principio Bioquímico:</strong> Esta absorción estimula la cadena de transporte de electrones, liberando óxido nítrico y multiplicando la síntesis de <strong>ATP (Adenosín Trifosfato)</strong>, la molécula de energía vital de cada célula.</p>
      </div>

      <img src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000" alt="Investigación médica en fototerapia" />

      <h2>Beneficios Clave Comprobados por la Literatura Científica</h2>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"><span></span></label><div><p><strong>Aceleración de la Recuperación Tisular:</strong> Promueve la síntesis de colágeno y la angiogénesis (formación de nuevos capilares).</p></div></li>
        <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"><span></span></label><div><p><strong>Efecto Antiinflamatorio y Analgésico:</strong> Disminuye los mediadores de la inflamación como PGE2 e interleucinas proinflamatorias.</p></div></li>
        <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"><span></span></label><div><p><strong>Mejora de la Viscosidad Sanguínea:</strong> Ayuda a que los glóbulos rojos recuperen su carga negativa natural, reduciendo la agregación.</p></div></li>
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div><p><strong>Regulación del Ritmo Circadiano:</strong> Aplicación nasal que estimula la oxigenación cerebral y calma el sistema nervioso autónomo.</p></div></li>
      </ul>

      <h2>Tabla Comparativa de Longitudes de Onda</h2>
      <table>
        <thead>
          <tr>
            <th>Longitud de Onda</th>
            <th>Profundidad</th>
            <th>Objetivo Anatómico</th>
            <th>Sensación Térmica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>650 nm (Rojo Visible)</strong></td>
            <td>2 - 3 mm</td>
            <td>Microvasos de la muñeca, cavidad nasal, piel</td>
            <td>Nula (Láser Frío)</td>
          </tr>
          <tr>
            <td><strong>808 nm (Infrarrojo)</strong></td>
            <td>40 - 60 mm</td>
            <td>Tendones, ligamentos, cápsulas articulares</td>
            <td>Agradable confort celular</td>
          </tr>
          <tr>
            <td><strong>Combinación Dual</strong></td>
            <td>Multinivel</td>
            <td>Acupuntura + Regeneración profunda</td>
            <td>Máxima sinergia terapéutica</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <p>"La verdadera medicina preventiva no consiste en apagar síntomas, sino en proveer a las células la energía y el entorno que necesitan para autorregularse y sanar."</p>
      </blockquote>

      <h2>Consejos para una Sesión Exitosa</h2>
      <ol>
        <li><strong>Hidratación Previa:</strong> Bebe 250-300 ml de agua 15 minutos antes de la sesión para optimizar la conductividad de los fluidos biológicos.</li>
        <li><strong>Consistencia Diaria:</strong> 1 o 2 sesiones diarias de 20 a 30 minutos producen mejores adaptaciones que sesiones esporádicas muy prolongadas.</li>
        <li><strong>Postura Relajada:</strong> Siéntate o recuéstate cómodamente respirando de manera profunda y pausada.</li>
      </ol>

      <div class="editor-callout editor-callout-tip">
        <p><strong>Recomendación Yimai Life:</strong> Consulta nuestro catálogo de equipos de fotobiomodulación certificados para encontrar el modelo que mejor se adapta a tus necesidades personales o familiares.</p>
      </div>
    `
  },
  {
    id: 'post-2',
    slug: 'puntos-acupuntura-radiales-salud-cardiovascular',
    title: 'Los Puntos de Acupuntura en la Muñeca y su Impacto en la Circulación',
    subtitle: 'La convergencia entre la sabiduría milenaria de la MTC y la tecnología biofotónica moderna',
    excerpt: 'Conoce por qué la arteria radial y los meridianos de Pulmón y Pericardio son la zona de aplicación más potente para la irradiación láser no invasiva.',
    category: 'Acupuntura y MTC',
    tags: ['Medicina China', 'Acupuntura Láser', 'Punto Neiguan', 'Arteria Radial'],
    author: {
      name: 'Dr. Ming Chen',
      role: 'Consultor de Medicina Tradicional China',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'
    },
    status: 'published',
    publishedAt: '2026-08-15T09:30:00.000Z',
    updatedAt: '2026-08-18T11:00:00.000Z',
    readingTime: 5,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    coverCaption: 'Localización de canales energéticos y puntos de acupuntura en el antebrazo',
    seoTitle: 'Puntos de Acupuntura en la Muñeca y Láser | Yimai Life',
    seoDescription: 'Descubre los puntos Neiguan, Daling y Shenmen y cómo la irradiación láser potencia su efecto en la salud cardiovascular y mental.',
    content: `
      <p class="lead">En la Medicina Tradicional China (MTC), la zona de la muñeca alberga puntos de intersección energética fundamentales que comunican directamente con el corazón, los pulmones y el sistema nervioso central.</p>

      <h2>El Punto Neiguan (PC6): El Gran Pacificador</h2>
      <p>Ubicado en la cara interna del antebrazo, a dos anchos de pulgar por encima del pliegue de la muñeca, entre los tendones palmar largo y flexor radial del carpo. Este punto es famoso en la práctica clínica por su capacidad para regular el ritmo cardíaco y calmar la mente (<em>Shen</em>).</p>

      <div class="editor-callout editor-callout-info">
        <p><strong>Sinergia con el Láser:</strong> La irradiación directa sobre Neiguan con luz coherente de 650nm produce una relajación vascular comprobable mediante ecografía doppler.</p>
      </div>

      <h3>Principales Puntos Estimulados por los Relojes Láser</h3>
      <ul>
        <li><strong>Neiguan (PC6):</strong> Equilibrio cardiovascular, alivio de náuseas y control del estrés.</li>
        <li><strong>Daling (PC7):</strong> Despeja el calor del corazón y estabiliza las emociones.</li>
        <li><strong>Shenmen (HT7):</strong> En el meridiano de Corazón, excelente para el insomnio y la agitación mental.</li>
        <li><strong>Taiyuan (LU9):</strong> En el meridiano de Pulmón, punto de reunión de todos los vasos sanguíneos.</li>
      </ul>
    `
  }
];

export const blogService = {
  // Get all posts
  getPosts: (): BlogPost[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
        return INITIAL_POSTS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading blog posts from localStorage', e);
      return INITIAL_POSTS;
    }
  },

  // Get published posts only (for public blog)
  getPublishedPosts: (): BlogPost[] => {
    return blogService.getPosts().filter(p => p.status === 'published');
  },

  // Get post by slug
  getPostBySlug: (slug: string): BlogPost | undefined => {
    return blogService.getPosts().find(p => p.slug === slug);
  },

  // Get post by ID
  getPostById: (id: string): BlogPost | undefined => {
    return blogService.getPosts().find(p => p.id === id);
  },

  // Save (Create or Update) post
  savePost: (post: BlogPost): BlogPost => {
    const posts = blogService.getPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    // Auto-calculate reading time if not set
    const words = post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    const updatedPost: BlogPost = {
      ...post,
      readingTime: post.readingTime || readingTime,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      posts[existingIndex] = updatedPost;
    } else {
      posts.unshift(updatedPost);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return updatedPost;
  },

  // Delete post
  deletePost: (id: string): boolean => {
    const posts = blogService.getPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length !== posts.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  },

  // Reset to default sample posts
  resetDefaults: (): BlogPost[] => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
    return INITIAL_POSTS;
  },

  // Draft auto-save
  saveDraftAuto: (draftData: Partial<BlogPost>): void => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
        ...draftData,
        savedAt: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Could not auto-save draft to localStorage', e);
    }
  },

  getDraftAuto: (): (Partial<BlogPost> & { savedAt?: string }) | null => {
    try {
      const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
      return draft ? JSON.parse(draft) : null;
    } catch (e) {
      return null;
    }
  },

  clearDraftAuto: (): void => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  },

  // Categories helper
  getCategories: (): BlogCategory[] => {
    return BLOG_CATEGORIES;
  },

  // Helpers
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};
