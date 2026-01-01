import React, { useState, useEffect } from 'react';
import { BookOpen, Download, FolderOpen, FileText, ChevronDown, Image, Video, Moon, Sun, Eye, X, GraduationCap, Notebook, Plus, ArrowLeft, Megaphone, Edit3, Save } from 'lucide-react';
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  const [expandedYears, setExpandedYears] = useState(() => {
    try {
      const saved = localStorage.getItem('expandedYears');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [expandedTerms, setExpandedTerms] = useState(() => {
    try {
      const saved = localStorage.getItem('expandedTerms');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [expandedSubjects, setExpandedSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem('expandedSubjects');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [expandedSections, setExpandedSections] = useState(() => {
    try {
      const saved = localStorage.getItem('expandedSections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [searchQuery] = useState('');
  const [previewItem, setPreviewItem] = useState(null);
  const [viewedItems, setViewedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('viewedItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newFilesSeen, setNewFilesSeen] = useState(() => {
    try {
      const saved = localStorage.getItem('newFilesSeen');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [viewedSections, setViewedSections] = useState(() => {
  try {
    const saved = localStorage.getItem('viewedSections');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
});
  
  // حالات ملاحظات المستخدم
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('userNotes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [isNotePanelOpen, setIsNotePanelOpen] = useState(false);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [isViewingNote, setIsViewingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  
  // حالات الأخبار (News)
  const [viewedNews, setViewedNews] = useState(() => {
    try {
      const saved = localStorage.getItem('viewedNews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isNewsPanelOpen, setIsNewsPanelOpen] = useState(false);
  const [isViewingNews, setIsViewingNews] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  
  // حفظ الإعدادات عند تغييرها
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('خطأ في حفظ darkMode:', error);
    }
  }, [darkMode]);
  useEffect(() => {
    try {
      localStorage.setItem('expandedYears', JSON.stringify(expandedYears));
    } catch (error) {
      console.error('خطأ في حفظ expandedYears:', error);
    }
  }, [expandedYears]);
  useEffect(() => {
    try {
      localStorage.setItem('expandedTerms', JSON.stringify(expandedTerms));
    } catch (error) {
      console.error('خطأ في حفظ expandedTerms:', error);
    }
  }, [expandedTerms]);
  useEffect(() => {
    try {
      localStorage.setItem('expandedSubjects', JSON.stringify(expandedSubjects));
    } catch (error) {
      console.error('خطأ في حفظ expandedSubjects:', error);
    }
  }, [expandedSubjects]);
  useEffect(() => {
    try {
      localStorage.setItem('expandedSections', JSON.stringify(expandedSections));
    } catch (error) {
      console.error('خطأ في حفظ expandedSections:', error);
    }
  }, [expandedSections]);
  useEffect(() => {
    try {
      localStorage.setItem('viewedItems', JSON.stringify(viewedItems));
    } catch (error) {
      console.error('خطأ في حفظ viewedItems:', error);
    }
  }, [viewedItems]);
  useEffect(() => {
    try {
      localStorage.setItem('newFilesSeen', JSON.stringify(newFilesSeen));
    } catch (error) {
      console.error('خطأ في حفظ newFilesSeen:', error);
    }
  }, [newFilesSeen]);
  useEffect(() => {
    try {
      localStorage.setItem('userNotes', JSON.stringify(notes));
    } catch (error) {
      console.error('خطأ في حفظ userNotes:', error);
    }
  }, [notes]);
  useEffect(() => {
    try {
      localStorage.setItem('viewedNews', JSON.stringify(viewedNews));
    } catch (error) {
      console.error('خطأ في حفظ viewedNews:', error);
    }
  }, [viewedNews]);
  useEffect(() => {
  try {
    localStorage.setItem('viewedSections', JSON.stringify(viewedSections));
  } catch (error) {
    console.error('خطأ في حفظ viewedSections:', error);
  }
}, [viewedSections]);
  
  // تعليم خبر كـ "تم رؤيته"
  const markNewsAsViewed = (newsId) => {
    if (!viewedNews.includes(newsId)) {
      setViewedNews(prev => [...prev, newsId]);
    }
  };
  const hasNewItemsInSection = (items) => {
  return items && items.some(item => item?.isNew && item?.id && !newFilesSeen[item.id]);
};

const hasNewItemsInImageGroups = (imageGroups) => {
  return imageGroups.some(group => 
    group.images.some(image => image.isNew && image.id && !newFilesSeen[image.id])
  );
};

// دالة للتحقق من وجود عناصر جديدة في المادة
const hasNewItemsInSubject = (subject) => {
  const hasNewFiles = subject.files?.some(f => f.isNew && f.id && !newFilesSeen[f.id]);
  const hasNewImages = subject.imageGroups?.some(g => 
    g.images?.some(img => img.isNew && img.id && !newFilesSeen[img.id])
  );
  const hasNewVideos = subject.videos?.some(v => v.isNew && v.id && !newFilesSeen[v.id]);
  
  return hasNewFiles || hasNewImages || hasNewVideos;
};

  // هذه هي الأخبار الثابتة - قم بتعديلها مباشرة في الكود
  const news = [
    {
      id: 'new-1',
      title: 'تنبيه عام',
      content: 'تم تطوير الموقع ورفع الملفات والصور والفيديوهات وتم إضافة بعد المميزات لمعرفتها بالتفصيل أضغط على علامة الاستفهام التي في أعلى يمين صفحة الموقع',
      date: '2025-12-13',
      isNew: true
    },
    {
      id: 'new-2',
      title: 'إضافة تلخيصات الفاينال',
      content: 'تم إضافة تلخيص مادة القضايا المجتمعية كاملةً وسيتم إضافة باقي المواد قريبًا إن شاء الله.',
      date: '2025-12-16',
      isNew: true
    },
    {
      id: 'new-3',
      title: 'تلخيصات نصف المواد',
      content: 'تم إضافة تخليصات نصف مواد الترم الأول، أنتظروا باقي النصف الأخر.',
      date: '2025-12-28',
      isNew: true
    },
  ];
  const subjects = {
    first: {
      first: [
                {
          id: 'f1-t1-s0',
          name: 'تلخيصات وفيديوهات وأسئلة المنهج كاملًا',
          files: [
            { 
              id: 'final-file-001',
              name: 'كتاب تلخيص مادة القضايا المجتمعية', 
              size: '0.73 MB',
              url: '/files/year1/term1/final/pdf/كتاب تلخيص مادة القضايا المجتمعية.pdf',
              isNew: true
            },
            { 
              id: 'final-file-002',
              name: 'كتاب تلخيص مادة اللغة العربية', 
              size: '0.72 MB',
              url: '/files/year1/term1/final/pdf/كتاب تلخيص مادة اللغة العربية.pdf',
              isNew: true
            },
            { 
              id: 'final-file-003',
              name: 'كتاب تلخيص مادة مهنة التعليم وأدوار المعلم ', 
              size: '0.8 MB',
              url: '/files/year1/term1/final/pdf/كتاب تلخيص مادة مهنة التعليم وأدوار المعلم.pdf',
              isNew: true
            },
            { 
              id: 'final-file-004',
              name: 'كتاب تلخيص مادة مدخل إلى الأدب العربي ', 
              size: '1.2 MB',
              url: '/files/year1/term1/final/pdf/كتاب تلخيص مادة مدخل إلى الأدب العربي.pdf',
              isNew: true
            },
            { 
              id: 'final-file-005',
              name: 'كتاب تلخيص مادة مدخل إلى البلاغة العربية ', 
              size: '1 MB',
              url: '/files/year1/term1/final/pdf/كتاب تلخيص مادة مدخل إلى البلاغة العربية.pdf',
              isNew: true
            },
            { 
              id: 'final-file-006',
              name: 'كتاب تلخيص مادة الاتجاهات المعاصرة في علم النفس ', 
              size: '1.4 MB',
              url: '/files/year1/term1/final/pdf/كتاب تلخيص محاضرات مادة الاتجاهات المعاصرة في علم النفس.pdf',
              isNew: true
            },
            { 
              id: 'final-file-007',
              name: 'كتاب تلخيص مادة مدخل إلى النحو العربي', 
              size: '1 MB',
              url: '/files/year1/term1/final/pdf/كتاب تلخيص مادة مدخل إلى النحو العربي.pdf',
              isNew: true
            },
            { 
              id: 'final-file-008',
              name: 'كتاب تلخيص مادة مهارات التواصل الصفي', 
              size: '1.5 MB',
              url: '/files/year1/term1/final/pdf/كتاب تلخيص مادة مهارات التواصل الصفي.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/final/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'final-video-001',
              name: 'تلخيص قضايا مجتمعية الجزء الأول', 
              duration: '07:17',
              url: '/files/year1/term1/final/videos/علم_اجتماع_السكان__معادلة_توازن.mp4',
              size: '35 MB',
              isNew: true
            },
            { 
              id: 'final-video-002',
              name: 'تلخيص قضايا مجتمعية الجزء الثاني', 
              duration: '07:25',
              url: '/files/year1/term1/final/videos/التنمية_والسكان__القصة_الكاملة.mp4',
              size: '32.5 MB',
              isNew: true
            },
            { 
              id: 'final-video-003',
              name: 'تلخيص اللغة العربية الجزء الأول', 
              duration: '07:48',
              url: '/files/year1/term1/final/videos/معمار_اللغة_العربية.mp4',
              size: '41.6 MB',
              isNew: true
            },
            { 
              id: 'final-video-004',
              name: 'تلخيص اللغة العربية الجزء الثاني', 
              duration: '06:52',
              url: '/files/year1/term1/final/videos/إتقان_رسالتك__علم_التواصل.mp4',
              size: '30 MB',
              isNew: true
            },
            { 
              id: 'final-video-005',
              name: 'تلخيص مهنة التعليم وأدوار المعلم الجزء الأول', 
              duration: '07:19',
              url: '/files/year1/term1/final/videos/مهنة_التدريس__من_الحرفة_للاحتراف1.mp4',
              size: '34.3 MB',
              isNew: true
            },
            { 
              id: 'final-video-006',
              name: 'تلخيص مهنة التعليم وأدوار المعلم الجزء الثاني', 
              duration: '06:32',
              url: '/files/year1/term1/final/videos/دور_المعلم__رحلة_م2ستمرة.mp4',
              size: '32.1 MB',
              isNew: true
            },
            { 
              id: 'final-video-007',
              name: 'تلخيص مدخل إلى الأدب العربي الجزء الأول', 
              duration: '06:41',
              url: '/files/year1/term1/final/videos/أدب1.mp4',
              size: '48.2 MB',
              isNew: true
            },
            { 
              id: 'final-video-008',
              name: 'تلخيص مدخل إلى الأدب العربي الجزء الثاني', 
              duration: '06:19',
              url: '/files/year1/term1/final/videos/أدب2.mp4',
              size: '44.8 MB',
              isNew: true
            },
            { 
              id: 'final-video-009',
              name: 'تلخيص مدخل إلى البلاغة العربية الجزء الأول', 
              duration: '08:13',
              url: '/files/year1/term1/final/videos/بلاغة1.mp4',
              size: '42 MB',
              isNew: true
            },
            { 
              id: 'final-video-0010',
              name: 'تلخيص مدخل إلى البلاغة العربية الجزء الثاني', 
              duration: '07:34',
              url: '/files/year1/term1/final/videos/بلاغة2.mp4',
              size: '38 MB',
              isNew: true
            },
            { 
              id: 'final-video-0011',
              name: 'تلخيص الاتجاهات المعاصرة في علم النفس الجزء الأول', 
              duration: '06:50',
              url: '/files/year1/term1/final/videos/اتجاهات1.mp4',
              size: '30 MB',
              isNew: true
            },
            { 
              id: 'final-video-0012',
              name: 'تلخيص الاتجاهات المعاصرة في علم النفس الجزء الثاني', 
              duration: '07:10',
              url: '/files/year1/term1/final/videos/اتجاهات2.mp4',
              size: '35.6 MB',
              isNew: true
            },
            { 
              id: 'final-video-0013',
              name: 'تلخيص مدخل إلى النحو العربي الجزء الأول', 
              duration: '06:24',
              url: '/files/year1/term1/final/videos/نحو1.mp4',
              size: '45 MB',
              isNew: true
            },
            { 
              id: 'final-video-0014',
              name: 'تلخيص مدخل إلى النحو العربي الجزء الثاني', 
              duration: '06:36',
              url: '/files/year1/term1/final/videos/نحو2.mp4',
              size: '26 MB',
              isNew: true
            },
            { 
              id: 'final-video-0015',
              name: 'تلخيص مهارات التواصل الصفي الجزء الأول', 
              duration: '07:03',
              url: '/files/year1/term1/final/videos/مهارات1.mp4',
              size: '33 MB',
              isNew: true
            },
            { 
              id: 'final-video-0016',
              name: 'تلخيص مهارات التواصل الصفي الجزء الثاني', 
              duration: '06:45',
              url: '/files/year1/term1/final/videos/مهارات2.mp4',
              size: '28 MB',
              isNew: true
            },
          ]
        },
        {
          id: 'f1-t1-s1',
          name: 'مدخل إلى الأدب العربي د. حنان أبو قاسم',
          files: [
            { 
              id: 'adab-book-001',
              name: 'مدخل إلى الأدب العربي الكتاب كامل', 
              size: '9.4 MB',
              url: '/files/year1/term1/adab/pdf/مدخل أدب عربي.pdf',
              isNew: true
            },
            { 
              id: 'adab-mid-001',
              name: 'تلخيص الأدب إلى صفحة ١٠٠ العام الماضي', 
              size: '41 MB',
              url: '/files/year1/term1/adab/pdf/تلخيص_الادب_لحد_ص_١٠٠.pdf',
              isNew: true
            },
            { 
              id: 'adab-mid-001',
              name: 'أدب مجموعة أولى', 
              size: '1.45 MB',
              url: '/files/year1/term1/adab/pdf/ميد ــ ادب مجموعه اولي.pdf',
              isNew: true
            },
            { 
              id: 'adab-mid-obj-001',
              name: 'أدب مجموعة أولى أسئلة موضوعية', 
              size: '2.5 MB',
              url: '/files/year1/term1/adab/pdf/موضوعي أدب مجموعه اولي.pdf',
              isNew: true
            },
            { 
              id: 'adab-poetry-001',
              name: 'مثال ملخص لنشأة الشعر', 
              size: '0.23 MB',
              url: '/files/year1/term1/adab/pdf/مثال ملخص لنشأة الشعر.pdf',
              isNew: true
            },
            { 
              id: 'adab-novel-001',
              name: 'مثال ملخص للرواية والتدوين', 
              size: '0.17 MB',
              url: '/files/year1/term1/adab/pdf/مثال ملخص للرواية والتدوين.pdf',
              isNew: true
            },
            { 
              id: 'adab-exam-001',
              name: 'نموذج امتحان أدب', 
              size: '0.13 MB',
              url: '/files/year1/term1/adab/pdf/نموذج امتحان مكتبة عربية.pdf',
              isNew: true
            }
          ],
          imageGroups: [
            {
              groupName: 'مُقررات الميد ترم',
              images: [
                { 
                  id: 'adab-mid-img-001',
                  name: 'مقرر امتحان أدب الميد ترم مجموعة أولى', 
                  size: '240 KB',
                  url: '/files/year1/term1/adab/images/مقرر ميد مجموعة أولى.PNG',
                  isNew: true
                },
                { 
                  id: 'adab-mid-img-002',
                  name: 'مقرر امتحان أدب الميد ترم مجموعة ثانية وثالثة', 
                  size: '325 KB',
                  url: '/files/year1/term1/adab/images/مقرر ميد مجموعة ثانية وثالثة.PNG',
                  isNew: true
                }
              ]
            },
            {
              groupName: 'تلخيص نشأة الشعر العربي',
              images: [
                { 
                  id: 'adab-t-img-1',
                  name: 'تلخيص ١', 
                  size: '430 KB',
                  url: '/files/year1/term1/adab/images/ت1.PNG',
                  isNew: true
                },
                { 
                  id: 'adab-t-img-2',
                  name: 'تخليص ٢', 
                  size: '555 KB',
                  url: '/files/year1/term1/adab/images/ت2.PNG',
                  isNew: true
                },
                { 
                  id: 'adab-t-img-3',
                  name: 'تلخيص ٣', 
                  size: '566 KB',
                  url: '/files/year1/term1/adab/images/ت3.PNG',
                  isNew: true
                },
                { 
                  id: 'adab-t-img-4',
                  name: 'تلخيص ٤', 
                  size: '758 KB',
                  url: '/files/year1/term1/adab/images/ت4.PNG',
                  isNew: true
                },
                { 
                  id: 'adab-t-img-5',
                  name: 'تلخيص ٥', 
                  size: '673 KB',
                  url: '/files/year1/term1/adab/images/ت5.PNG',
                  isNew: true
                },
                { 
                  id: 'adab-t-img-6',
                  name: 'تلخيص ٦', 
                  size: '717 KB',
                  url: '/files/year1/term1/adab/images/ت6.PNG',
                  isNew: true
                },
                { 
                  id: 'adab-t-img-7',
                  name: 'تلخيص ٧', 
                  size: '36 KB',
                  url: '/files/year1/term1/adab/images/ت7.PNG',
                  isNew: true
                }
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              size: '0 MB',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s2',
          name: 'مدخل إلى البلاغة العربية د. أيمن عبد العظيم',
          files: [
            { 
              id: 'balagha-book-001',
              name: 'مدخل إلى البلاغة العربية الكتاب كامل', 
              size: '1.23 MB',
              url: '/files/year1/term1/balagha/pdf/مدخل إلى البلاغة العربية.pdf',
              isNew: true
            },
            { 
              id: 'balagha-book-002',
              name: 'تلخيص مقرر الميد ترم البلاغة', 
              size: '0.12 MB',
              url: '/files/year1/term1/balagha/pdf/تلخيص بلاغة ميد.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/balagha/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'balagha-video-001',
              name: 'تلخيص مقرر الميد ترم البلاغة', 
              duration: '07:34',
              url: '/files/year1/term1/balagha/videos/علم_المعاني__مفتاح_البلاغة.mp4',
              size: '46.5 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s3',
          name: 'مهنة التعليم وأدوار المعلم د. جملات محمد',
          files: [
            { 
              id: 'mehna-file-001',
              name: 'مهنة التعليم وأدوار المعلم الكتاب كامل', 
              size: '1 MB',
              url: '/files/year1/term1/mehna/pdf/مهنة التعليم وأدوار المعلم2024-2025.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-002',
              name: 'تلخيص مهنة تعليم', 
              size: '7 MB',
              url: '/files/year1/term1/mehna/pdf/مهنه تعليم.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-003',
              name: 'مراحل تطور التعليم الفصل الأول', 
              size: '0.12 MB',
              url: '/files/year1/term1/mehna/pdf/مراحل تطور التعليم الفصل الأول.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-004',
              name: 'المحاضرة الأولي لمهنة التعليم', 
              size: '0.5 MB',
              url: '/files/year1/term1/mehna/pdf/المحاضرة الأولي لمهنة التعليم.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-005',
              name: 'المحاضرة الثانية مهنة التعليم', 
              size: '0.56 MB',
              url: '/files/year1/term1/mehna/pdf/المحاضرة الثانية مهنة التعليم (1).pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-006',
              name: 'المحاضرة الثانية والثالثة مهنة التعليم', 
              size: '6.6 MB',
              url: '/files/year1/term1/mehna/pdf/المحاضرة الثانية والثالثة مهنة التعليم 1.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-007',
              name: 'محاضرة (4) اتجاهات معاصرة في إعداد المعلم', 
              size: '0.74 MB',
              url: '/files/year1/term1/mehna/pdf/محاضرة (4) اتجاهات معاصرة في إعداد المعلم.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-008',
              name: 'محاضرة (5) اتجاهات معاصرة في إعداد المعلم', 
              size: '1.1 MB',
              url: '/files/year1/term1/mehna/pdf/محاضرة (5) اتجاهات معاصرة في إعداد المعلم.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-009',
              name: 'الفصل الثالث التنمية المهنية للمعلم', 
              size: '1 MB',
              url: '/files/year1/term1/mehna/pdf/الفصل الثالث التنمية المهنية للمعلم.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-010',
              name: 'مهنة التعليم كلها', 
              size: '4.8 MB',
              url: '/files/year1/term1/mehna/pdf/مهنة التعليم كلها.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-011',
              name: 'ترخيص مزاولة المهنة', 
              size: '0.28 MB',
              url: '/files/year1/term1/mehna/pdf/ترخيص مزاولة المهنة.pdf',
              isNew: true
            },
            { 
              id: 'mehna-file-012',
              name: 'تحضير على أخر جزء من الفصل الثالث مهنة التعليم', 
              size: '0.17 MB',
              url: '/files/year1/term1/mehna/pdf/تحضير على أخر جزء من الفصل الثالث مهنة التعليم.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/mehna/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/mehna/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            },
          ]
        },
        {
          id: 'f1-t1-s4',
          name: 'المنهج المدرسي أ.د/ حسن عمران',
          files: [
            { 
              id: 'manhag-file-001',
              name: 'المنهج المدرسي الكتاب كامل', 
              size: '65 MB',
              url: '/files/year1/term1/manhag/pdf/منهج مدرسي د. حسن عمران.pdf',
              isNew: true
            },
            { 
              id: 'manhag-file-002',
              name: 'منهج مدرسي الفصل الأول مقرر الميد ترم', 
              size: '30 MB',
              url: '/files/year1/term1/manhag/pdf/منهج مدرسي مقرر الميد ترم.pdf',
              isNew: true
            },
            { 
              id: 'manhag-file-003',
              name: 'تلخيص الفصل الأول منهج مدرسي الميد ترم', 
              size: '0.1 MB',
              url: '/files/year1/term1/manhag/pdf/تلخيص الفصل الأول منهج مدرسي.pdf',
              isNew: true
            },
            { 
              id: 'manhag-file-004',
              name: 'المنهج المدرسي أولى جميع الشعب', 
              size: '1.3 MB',
              url: '/files/year1/term1/manhag/pdf/المنهج_المدرسي_أولي_جميع_الشعب.pdf',
              isNew: true
            },
            { 
              id: 'manhag-file-005',
              name: 'منهج المدرسي فصل ١ و ٢ و ٣', 
              size: '1.3 MB',
              url: '/files/year1/term1/manhag/pdf/منهج_المدرسي_فصل١_و_٢_و_٣_د._عنايات.pdf',
              isNew: true
            },
            { 
              id: 'manhag-file-006',
              name: 'تلخيص الفصل ١ و ٢ المنهج المدرسي', 
              size: '4.1 MB',
              url: '/files/year1/term1/manhag/pdf/تلخيص الفصل ١-٢المنهج  المدرسي.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'امتحان قصير على الفصل الأول منهج مدرسي',
              images: [
                { 
                  id: 'exam-1',
                  name: 'سؤال ١', 
                  size: '19.6 KB',
                  url: '/files/year1/term1/manhag/images/كويز1.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-2',
                  name: 'سؤال ٢', 
                  size: '20 KB',
                  url: '/files/year1/term1/manhag/images/كويز2.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-3',
                  name: 'سؤال ٣', 
                  size: '20 KB',
                  url: '/files/year1/term1/manhag/images/كويز3.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-4',
                  name: 'سؤال ٤', 
                  size: '20.5 KB',
                  url: '/files/year1/term1/manhag/images/كويز4.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-5',
                  name: 'سؤال ٥', 
                  size: '20.5 KB',
                  url: '/files/year1/term1/manhag/images/كويز5.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-6',
                  name: 'سؤال ٦', 
                  size: '19 KB',
                  url: '/files/year1/term1/manhag/images/كويز6.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-7',
                  name: 'سؤال ٧', 
                  size: '21 KB',
                  url: '/files/year1/term1/manhag/images/كويز7.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-8',
                  name: 'سؤال ٨', 
                  size: '18.5 KB',
                  url: '/files/year1/term1/manhag/images/كويز8.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-9',
                  name: 'سؤال ٩', 
                  size: '19 KB',
                  url: '/files/year1/term1/manhag/images/كويز9.PNG',
                  isNew: true
                },
                { 
                  id: 'exam-10',
                  name: 'سؤال ١٠', 
                  size: '21 KB',
                  url: '/files/year1/term1/manhag/images/كويز10.PNG',
                  isNew: true
                },
              ]
            },
            {
              groupName: 'إجابات على الامتحان القصير على الفصل الأول منهج مدرسي',
              images: [
                { 
                  id: 'answer-1',
                  name: 'إجابة رقم ١', 
                  size: '20 KB',
                  url: '/files/year1/term1/manhag/images/ج1.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-2',
                  name: 'إجابة رقم ٢', 
                  size: '22 KB',
                  url: '/files/year1/term1/manhag/images/ج2.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-3',
                  name: 'إجابة رقم ٣', 
                  size: '21 KB',
                  url: '/files/year1/term1/manhag/images/ج3.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-4',
                  name: 'إجابة رقم ٤', 
                  size: '22 KB',
                  url: '/files/year1/term1/manhag/images/ج4.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-5',
                  name: 'إجابة رقم ٥', 
                  size: '21.5 KB',
                  url: '/files/year1/term1/manhag/images/ج5.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-6',
                  name: 'إجابة رقم ٦', 
                  size: '20.5 KB',
                  url: '/files/year1/term1/manhag/images/ج6.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-7',
                  name: 'إجابة رقم ٧', 
                  size: '21.7 KB',
                  url: '/files/year1/term1/manhag/images/ج7.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-8',
                  name: 'إجابة رقم ٨', 
                  size: '19.5 KB',
                  url: '/files/year1/term1/manhag/images/ج8.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-9',
                  name: 'إجابة رقم ٩', 
                  size: '21 KB',
                  url: '/files/year1/term1/manhag/images/ج9.PNG',
                  isNew: true
                },
                { 
                  id: 'answer-10',
                  name: 'إجابة رقم ١٠', 
                  size: '23 KB',
                  url: '/files/year1/term1/manhag/images/ج10.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'manhag-video-001',
              name: 'فيديو تلخيص الفصل الأول منهج مدرسي على امتحان الميد ترم', 
              duration: '07:09',
              url: '/files/year1/term1/manhag/videos/تطور_المنهج__من_المحتوى_للخبرة.mp4',
              size: '35.5 MB',
              isNew: true
            },
          ]
        },
        {
id: 'f1-t1-s5',
          name: 'المكتبة العربية د. عاطف عبد العليم',
          files: [
            { 
              id: 'maktba-file-001',
              name: 'المكتبة العربية الكتاب كامل', 
              size: '10 MB',
              url: '/files/year1/term1/maktba/pdf/المكتبة العربية المستوى الأول عام.pdf',
              isNew: true
            },
            { 
              id: 'maktba-file-002',
              name: 'كتاب الحيوان للجاحظ', 
              size: '53 MB',
              url: '/files/year1/term1/maktba/pdf/كتاب الحيوان.pdf',
              isNew: true
            },
            { 
              id: 'maktba-file-003',
              name: 'كتاب الكامل للمبرّد', 
              size: '43 MB',
              url: '/files/year1/term1/maktba/pdf/كتاب الكامل.pdf',
              isNew: true
            },
            { 
              id: 'maktba-file-004',
              name: 'المكتبة العربية', 
              size: '2.7 MB',
              url: '/files/year1/term1/maktba/pdf/المكتبه العربيه .pdf',
              isNew: true
            },
            { 
              id: 'maktba-file-005',
              name: 'شرح المكتبة العربية من المحاضرة ١ إلى ٦', 
              size: '6.1 MB',
              url: '/files/year1/term1/maktba/pdf/شرح المكتبة العربية من المحاضرة ١ إلى ٦.pdf',
              isNew: true
            },
            { 
              id: 'maktba-file-006',
              name: 'مذكرة مكتبة عربية', 
              size: '6.2 MB',
              url: '/files/year1/term1/maktba/pdf/مذكرة مكتبة عربية.pdf',
              isNew: true
            },
            { 
              id: 'maktba-file-007',
              name: 'المكتبة العربية امتحان أعمال السنة', 
              size: '0.85 MB',
              url: '/files/year1/term1/maktba/pdf/المكتبة العربية امتحان أعمال السنة.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/maktba/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/maktba/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            },
          ]
        },
        {
          id: 'f1-t1-s6',
          name: 'عملي مهنة التعليم وأدوار المعلم د. نوال',
          files: [
            { 
              id: '3mly-file-001',
              name: 'مهنة التعليم وأدوار المعلم تطبيقي فاينال الكتاب كامل', 
              size: '0.5 MB',
              url: '/files/year1/term1/3mly/pdf/مهنة التعليم وأدوار المعلم تطبيقي .pdf',
              isNew: true
            },
            { 
              id: '3mly-file-002',
              name: 'تلخيص مهنة التعليم وأدوار المعلم تطبيقي فاينال', 
              size: '0.12 MB',
              url: '/files/year1/term1/3mly/pdf/تلخيص مهنة التعليم التطبيقي فاينال.pdf',
              isNew: true
            },
            { 
              id: '3mly-file-003',
              name: 'عملي مهنة التعليم وأدوار المعلم فصل أول الميد ترم', 
              size: '5 MB',
              url: '/files/year1/term1/3mly/pdf/عملى مهنة التعليم ميد.pdf',
              isNew: true
            },
            { 
              id: '3mly-file-004',
              name: 'تلخيص عملي مهنة التعليم الميد ترم ما عدا الفصل الأول', 
              size: '0.12 MB',
              url: '/files/year1/term1/3mly/pdf/تلخيص عملي مهنة التعليم ميد.pdf',
              isNew: true
            },
            { 
              id: '3mly-file-005',
              name: 'سكشن مهنه التعليم وأدوار المعلم', 
              size: '1.6 MB',
              url: '/files/year1/term1/3mly/pdf/سكشن مهنه التعليم وأدوار المعلم.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/3mly/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '3mly-video-001',
              name: 'تلخيص مهنة التعليم وأدوار المعلم تطبيقي فاينال', 
              duration: '05:43',
              url: '/files/year1/term1/3mly/videos/رسالة_المعلم__ركيزة_تحت_الضغط.mp4',
              size: '30.5 MB',
              isNew: true
            },
            { 
              id: '3mly-video-002',
              name: 'تلخيص مهنة التعليم الميد ترم ما عدا الفصل الأول', 
              duration: '06:08',
              url: '/files/year1/term1/3mly/videos/مهنة_التعليم__رسالة_وتحدي.mp4',
              size: '29 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s7',
          name: 'اللغة العربية د. أماني حامد',
          files: [
            { 
              id: '3rby-file-001',
              name: 'اللغة العربية الكتاب كامل', 
              size: '2.5 MB',
              url: '/files/year1/term1/3rby/pdf/اللغة العربية.pdf',
              isNew: true
            },
            { 
              id: '3rby-file-002',
              name: 'مذكرة اللغة العربية', 
              size: '0.4 MB',
              url: '/files/year1/term1/3rby/pdf/مذكرة اللغة العربية.pdf',
              isNew: true
            },
            { 
              id: '3rby-file-003',
              name: 'مذكرة اللغة العربية', 
              size: '13.6 MB',
              url: '/files/year1/term1/3rby/pdf/مذكرة اللغة العربية-1-1.pdf',
              isNew: true
            },
            { 
              id: '3rby-file-004',
              name: 'نموذج ١ تكليف التقرير', 
              size: '0.14 MB',
              url: '/files/year1/term1/3rby/pdf/نموذج تقرير 1.pdf',
              isNew: true
            },
            { 
              id: '3rby-file-005',
              name: 'نموذج ٢ تكليف التقرير', 
              size: '0.13 MB',
              url: '/files/year1/term1/3rby/pdf/نموذج تقرير 2.pdf',
              isNew: true
            },
            { 
              id: '3rby-file-006',
              name: 'تلخيص اللغة العربية الميد ترم', 
              size: '0.1 MB',
              url: '/files/year1/term1/3rby/pdf/تلخيص اللغة العربية ميد.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/3rby/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '3rby-video-001',
              name: 'تلخيص الميد ترم', 
              duration: '06:20',
              url: '/files/year1/term1/3rby/videos/اللغة_العربية__كنز_وبيان.mp4',
              size: '41.6 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s8',
          name: 'مدخل إلى النحو العربي د. محمد حسين',
          files: [
            { 
              id: 'nahw-file-001',
              name: 'مدخل إلى النحو العربي الكتاب كامل', 
              size: '2.8 MB',
              url: '/files/year1/term1/nahw/pdf/مدخل إلى النحو العربي كاملا.pdf',
              isNew: true
            },
            { 
              id: 'nahw-file-002',
              name: 'مدخل الى النحو العربي ١', 
              size: '7.1 MB',
              url: '/files/year1/term1/nahw/pdf/مدخل الى النحو العربي..pdf',
              isNew: true
            },
            { 
              id: 'nahw-file-003',
              name: 'مدخل الى النحو العربي ٢', 
              size: '2 MB',
              url: '/files/year1/term1/nahw/pdf/مدخل الى النحو العربي2.pdf',
              isNew: true
            },
            { 
              id: 'nahw-file-004',
              name: 'جزء أول نحو', 
              size: '5.7 MB',
              url: '/files/year1/term1/nahw/pdf/جزء اول نحو.pdf',
              isNew: true
            },
            { 
              id: 'nahw-file-005',
              name: 'نحو وصرف دكتور حسين', 
              size: '4.7 MB',
              url: '/files/year1/term1/nahw/pdf/نحو وصرف دكتور حسين.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/nahw/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/nahw/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s9',
          name: 'علوم قرآن د. محمد حجاجي',
          files: [
            { 
              id: 'quran-file-001',
              name: 'علوم قرآن الكتاب كامل', 
              size: '1.6 MB',
              url: '/files/year1/term1/quran/pdf/علوم القرآن كاملا.pdf',
              isNew: true
            },
            { 
              id: 'quran-file-002',
              name: 'علوم قرآن', 
              size: '0.5 MB',
              url: '/files/year1/term1/quran/pdf/علوم قرآن .pdf',
              isNew: true
            },
            { 
              id: 'quran-file-003',
              name: 'علوم القرآن محاضرة ٦', 
              size: '1.3 MB',
              url: '/files/year1/term1/quran/pdf/علوم القرآن محاضرة ٦.pdf',
              isNew: true
            },
            { 
              id: 'quran-file-004',
              name: 'علوم القرآن ٧', 
              size: '2.2 MB',
              url: '/files/year1/term1/quran/pdf/علوم القرآن ٧.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/quran/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/quran/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s10',
          name: 'مهارات التواصل الصفي د. صابر علام',
          files: [
            { 
              id: 'mharat-file-001',
              name: 'مهارات التواصل الصفي الكتاب كامل', 
              size: '40 MB',
              url: '/files/year1/term1/mharat/pdf/أولى عام عربي مهارات التواصل الصفي د.صابر علام.pdf',
              isNew: true
            },
            { 
              id: 'mharat-file-002',
              name: 'تواصل صفي', 
              size: '0.7 MB',
              url: '/files/year1/term1/mharat/pdf/تواصل صفى .pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/mharat/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/mharat/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s11',
          name: 'الاتجاهات المعاصرة في علم النفس د. عادل سمير',
          files: [
            { 
              id: 'atgahat-file-001',
              name: 'اتجاهات معاصرة الكتاب كامل', 
              size: '2 MB',
              url: '/files/year1/term1/atgahat/pdf/اتجاهات معاصرة في علم النفس جميع الشعب.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-002',
              name: 'محاضرة ١ اتجاهات معاصرة', 
              size: '0.37 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 1 اتجاهات معاصرة.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-003',
              name: 'محاضرة ١ اتجاهات معاصرة علم نفس', 
              size: '0.33 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 1 اتجاهات معاصرة علم نفس.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-004',
              name: 'محاضرة ٢ اتجاهات معاصرة', 
              size: '0.3 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 2 اتجاهات معاصرة 2025.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-005',
              name: 'محاضرة ٢ التفكير الايجابي', 
              size: '0.26 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 2 التفكير الايجابي.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-006',
              name: 'محاضرة ٣ اتجاهات معاصرة', 
              size: '0.37 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 3 اتجاهات معاصرة 2025.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-007',
              name: 'محاضرة ٣ ابداع انفعالي', 
              size: '0.34 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 3 ابداع انفعالي.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-008',
              name: 'محاضرة ٤ اتجاهات معاصرة', 
              size: '0.3 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 4 اتجاهات معاصرة.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-009',
              name: 'محاضرة ٤ تسويف نشط وعزو سببي', 
              size: '0.4 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 4 تسويف نشط وعزو سببي.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-010',
              name: 'محاضرة ٥ اتجاهات معاصرة', 
              size: '0.37 MB',
              url: '/files/year1/term1/atgahat/pdf/محاضرة 5 اتجاهات معاصرة.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-011',
              name: 'مقرر اتجاهات معاصرة د. عادل ٢٠٢٤', 
              size: '1.7 MB',
              url: '/files/year1/term1/atgahat/pdf/مقرر اتجاهات معاصرة د عادل 2024.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-012',
              name: 'تلخيص محاضرات علم النفس', 
              size: '6.6 MB',
              url: '/files/year1/term1/atgahat/pdf/تلخيص محضرات علم النفس.pdf',
              isNew: true
            },
            { 
              id: 'atgahat-file-013',
              name: 'للتدريب', 
              size: '0.25 MB',
              url: '/files/year1/term1/atgahat/pdf/للتدريب.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/balagha/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s12',
          name: 'مدخل إلى النقد العربي أ.د/ سعيد فرغلي',
          files: [
            { 
              id: 'nakd-file-001',
              name: 'مدخل إلى النقد العربي الكتاب كامل', 
              size: '2.7 MB',
              url: '/files/year1/term1/nakd/pdf/مدخل إلى النقد العربي.pdf',
              isNew: true
            },
            { 
              id: 'nakd-file-002',
              name: 'نقد الميد ترم', 
              size: '15.8 MB',
              url: '/files/year1/term1/nakd/pdf/نقد الميد.pdf',
              isNew: true
            },
            { 
              id: 'nakd-file-003',
              name: 'النقد الأدبي المحاضرتان الأولى والثانية الميد ترم', 
              size: '0.7 MB',
              url: '/files/year1/term1/nakd/pdf/مدخل إلى النقد الأدبي المحاضرتان الأولى والثانية.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/nakd/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/nakd/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s13',
          name: 'تفسير وتجويد د. محمد عبد الرازق',
          files: [
            { 
              id: 'tafser-file-001',
              name: 'فن التجويد الكتاب كامل', 
              size: '2.6 MB',
              url: '/files/year1/term1/tafser/pdf/فن التجويد.pdf',
              isNew: true
            },
            { 
              id: 'tafser-file-002',
              name: 'مذكرة مناهج التفسي معدلة الكتاب كامل', 
              size: '1.3 MB',
              url: '/files/year1/term1/tafser/pdf/مذكرة مناهج التفسير معدلة.pdf',
              isNew: true
            },
            { 
              id: 'tafser-file-003',
              name: 'تجويد الميد ترم', 
              size: '12.5 MB',
              url: '/files/year1/term1/tafser/pdf/تجويد الميد.pdf',
              isNew: true
            },
            { 
              id: 'tafser-file-004',
              name: 'تفسير أولى تربية', 
              size: '1.3 MB',
              url: '/files/year1/term1/tafser/pdf/تفسير أولى تربية.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/tafser/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/tafser/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s14',
          name: 'قضايا مجتمعية',
          files: [
            { 
              id: 'kdaya-file-001',
              name: 'قضايا مجتمعية الكتاب كامل', 
              size: '2.7 MB',
              url: '/files/year1/term1/kdaya/pdf/قضايا مجتمعية جزء السكان اولى جميع الشعب.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'فارغ',
              images: [
                { 
                  id: '',
                  name: 'فارغ', 
                  size: '0 KB',
                  url: '/files/year1/term1/kdaya/images/فارغ.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: '',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/kdaya/videos/فارغ.mp4',
              size: '0 MB',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s15',
          name: 'ملفات أخرى',
          files: [
            { 
              id: 'mlfat-file-001',
              name: 'جدول المحاضرات الحديث بعد أخر التعديلات', 
              size: '0.13 MB',
              url: '/files/year1/term1/mlfat/pdf/جدول محاضرات بعد التعديلات.pdf',
              isNew: true
            },
            { 
              id: 'mlfat-file-002',
              name: 'لائحة أسماء الطلاب المقيدين بشعبة اللغة العربية فرقة أولى', 
              size: '0.2 MB',
              url: '/files/year1/term1/mlfat/pdf/قائمة أسماء شعبة لغة عربية فرقة أولى.pdf',
              isNew: true
            },
            { 
              id: 'mlfat-file-003',
              name: 'لائحة أسماء الطلاب وأرقام الجلوس أولى لغة عربية', 
              size: '0.5 MB',
              url: '/files/year1/term1/mlfat/pdf/لائحة أسماء الطلاب وأرقام الجلوس أولى لغة عربية .pdf',
              isNew: true
            },
            { 
              id: 'mlfat-file-004',
              name: 'أكواد لوائح السنوات والمستويات على Microsoft Teams', 
              size: '0.03 MB',
              url: '/files/year1/term1/mlfat/pdf/أكواد لوائح السنوات والمستويات على Microsoft Teams.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'صور أخرى',
              images: [
                { 
                  id: 'mlfat-img-01-001',
                  name: 'QR Code for the Website', 
                  size: '437 KB',
                  url: '/files/year1/term1/mlfat/images/QR Code College Files Website.PNG',
                  isNew: true
                },
                { 
                  id: 'mlfat-img-01-002',
                  name: 'جدول امتحانات الترم الأول', 
                  size: '460 KB',
                  url: '/files/year1/term1/mlfat/images/جدول الامتحانات.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'mlfat-video-001',
              name: 'College Files Website', 
              duration: '00:08',
              url: '/files/year1/term1/mlfat/videos/ad.mp4',
              size: '8.7 MB',
              isNew: true
            },
            { 
              id: 'mlfat-video-002',
              name: 'مميزات الموقع وطريقة استخدامه', 
              duration: '04:04',
              url: '/files/year1/term1/mlfat/videos/طريقة استخدام الموقع.mp4',
              size: '7.8 MB',
              isNew: true
            },
            { 
              id: 'mlfat-video-003',
              name: 'طريقة تنزيل تطبيق College Files App على هواتف أندرويد', 
              duration: '01:17',
              url: '/files/year1/term1/mlfat/videos/طريقة تنزيل التطبيق.mp4',
              size: '7 MB',
              isNew: true
            },
          ]
        },
      ],
      second: []
    },
    second: {
      first: [],
      second: []
    },
    third: {
      first: [],
      second: []
    },
    fourth: {
      first: [],
      second: []
    }
  };
  const years = [
    { id: 'first', name: 'الفرقة الأولى', icon: GraduationCap },
    { id: 'second', name: 'الفرقة الثانية', icon: GraduationCap },
    { id: 'third', name: 'الفرقة الثالثة', icon: GraduationCap },
    { id: 'fourth', name: 'الفرقة الرابعة', icon: GraduationCap }
  ];
  const terms = [
    { id: 'first', name: 'الترم الأول' },
    { id: 'second', name: 'الترم الثاني' }
  ];
  const toggleYear = (yearId) => {
    setExpandedYears(prev => ({ ...prev, [yearId]: !prev[yearId] }));
  };
  const toggleTerm = (yearId, termId) => {
    const key = `${yearId}-${termId}`;
    setExpandedTerms(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleSubject = (subjectId) => {
  const isExpanding = !expandedSubjects[subjectId];
  
  setExpandedSubjects(prev => ({ ...prev, [subjectId]: isExpanding }));
  
  // تعليم المادة كمُشاهدة بمجرد فتحها
  if (isExpanding) {
    setViewedSections(prev => ({
      ...prev,
      [`subject-${subjectId}`]: true
    }));
  }
};
  const toggleSection = (subjectId, section) => {
  const key = `${subjectId}-${section}`;
  const isExpanding = !expandedSections[key];
  
  setExpandedSections(prev => ({ ...prev, [key]: isExpanding }));
  
  // تعليم القسم كمُشاهد بمجرد فتحه
  if (isExpanding) {
    setViewedSections(prev => ({
      ...prev,
      [key]: true
    }));
  }
};
  const openPreview = (item, type) => {
  // إصلاح الرابط ليشمل PUBLIC_URL
  const fixedUrl = item.url && !item.url.startsWith('http') 
    ? `${process.env.PUBLIC_URL}${item.url}`
    : item.url;
  
  setPreviewItem({ 
    ...item, 
    type, 
    url: fixedUrl // تخزين الرابط المُصلح
  });
  
  markAsViewed(item.url || item.name);
  if (item.isNew && item.id) {
    markFileAsSeen(item.id);
  }
};
  const closePreview = () => {
    setPreviewItem(null);
  };
  const markAsViewed = (identifier) => {
    if (!viewedItems.includes(identifier)) {
      setViewedItems(prev => [...prev, identifier]);
    }
  };
  const markFileAsSeen = (fileId) => {
    if (fileId && !newFilesSeen[fileId]) {
      setNewFilesSeen(prev => {
        const updated = { ...prev, [fileId]: true };
        try {
          localStorage.setItem('newFilesSeen', JSON.stringify(updated));
        } catch (error) {
          console.error('خطأ في حفظ newFilesSeen:', error);
        }
        return updated;
      });
    }
  };
  
  // دوال ملاحظات المستخدم
  const openNotePanel = () => {
    setIsNotePanelOpen(true);
    setIsCreatingNote(false);
    setIsViewingNote(false);
    setIsEditingNote(false);
    setSelectedNoteId(null);
  };
  
  const closeNotePanel = () => {
    setIsNotePanelOpen(false);
    setIsCreatingNote(false);
    setIsViewingNote(false);
    setIsEditingNote(false);
    setCurrentNote({ title: '', content: '' });
    setSelectedNoteId(null);
  };
  
  const openCreateNote = () => {
    setIsCreatingNote(true);
    setIsViewingNote(false);
    setIsEditingNote(false);
    setCurrentNote({ title: '', content: '' });
    setSelectedNoteId(null);
  };
  
  const saveNote = () => {
    if (currentNote.title.trim() && currentNote.content.trim()) {
      const newNote = {
        id: Date.now().toString(),
        title: currentNote.title,
        content: currentNote.content,
        createdAt: new Date().toLocaleString('ar-EG', { 
  year: 'numeric', 
  month: '2-digit', 
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})
      };
      setNotes(prev => [newNote, ...prev]);
      setIsCreatingNote(false);
      setCurrentNote({ title: '', content: '' });
    }
  };
  
  const viewNote = (note) => {
    setIsViewingNote(true);
    setIsEditingNote(false);
    setCurrentNote(note);
    setSelectedNoteId(note.id);
  };
  
  const startEditingNote = () => {
    setIsEditingNote(true);
    setIsViewingNote(false);
  };
  
  const saveEditedNote = () => {
    if (currentNote.title.trim() && currentNote.content.trim()) {
      setNotes(prev => 
        prev.map(note => 
          note.id === currentNote.id 
            ? { ...currentNote, editedAt: new Date().toLocaleString('ar-EG') }
            : note
        )
      );
      setIsEditingNote(false);
      setIsViewingNote(true);
    }
  };
  
  const requestDeleteNote = (note) => {
    setNoteToDelete(note);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteNote = () => {
    if (noteToDelete) {
      setNotes(prev => prev.filter(note => note.id !== noteToDelete.id));
      if (selectedNoteId === noteToDelete.id) {
        setIsViewingNote(false);
        setIsEditingNote(false);
        setSelectedNoteId(null);
      }
      setShowDeleteConfirm(false);
      setNoteToDelete(null);
    }
  };
  
  const cancelDeleteNote = () => {
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  };
  
  const handleNoteInputChange = (field, value) => {
    setCurrentNote(prev => ({ ...prev, [field]: value }));
  };
  
  // دوال الأخبار
  const openNewsPanel = () => {
    setIsNewsPanelOpen(true);
    setIsViewingNews(false);
    setCurrentNews(null);
  };
  
  const closeNewsPanel = () => {
    setIsNewsPanelOpen(false);
    setIsViewingNews(false);
    setCurrentNews(null);
  };
  
  const viewNews = (newsItem) => {
    setIsViewingNews(true);
    setCurrentNews(newsItem);
    markNewsAsViewed(newsItem.id);
  };
  
  return (
    <div className={`min-h-screen transition-all duration-700 ease-in-out ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`} dir="rtl" style={{ fontFamily: 'Segoe UI, Tahoma, Arial, sans-serif' }}>
      <header className={`${darkMode ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900' : 'bg-gradient-to-r from-blue-600 to-green-600'} text-white shadow-lg transition-all duration-700`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <div className="flex items-center gap-3">
              <BookOpen size={48} />
              <div className="absolute top-4 right-4 z-10">
  <button
    onClick={() => setShowHelp(true)}
    className="w-9 h-9 rounded-full bg-gray-800 text-white font-bold text-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
    aria-label="تعليمات"
  >
    ؟
  </button>
</div>

{/* نافذة التعليمات */}
{showHelp && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6">
      <button
        onClick={() => setShowHelp(false)}
        className="absolute -top-2 translate-y-5 -left-3 translate-x-5 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700"
      >
        <X size={18} />
      </button>
      
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 pl-4">
        دليل موقع ملفات كلية التربية – شعبة اللغة العربية | جامعة أسيوط
      </h2>
      
      <p className="text-center mb-6 text-gray-600">
        مرحباً بك في موقعك الشامل لتجميع جميع مواردك الدراسية في مكان واحد!
      </p>
      
      <h3 className="text-xl font-bold mb-3 text-gray-800">أبرز المميزات:</h3>
      <ul className="space-y-2 mb-6 text-gray-700">
        <li>👁️ زر "العين": معاينة سريعة لأي ملف (PDF، صورة، فيديو) قبل التنزيل.</li>
        <li>⬇️ زر "التنزيل": تحميل مباشر لأي ملف بضغطة واحدة.</li>
        <li>📝 دفتر الملاحظات: أضف ملاحظاتك الشخصية، عدّلها، واحفظها محلياً  على جهازك ولا نستطيع رؤية ما كتبته — لن تُحذف حتى بعد الخروج!</li>
        <li>🌙 الوضع الليلي/النهاري: في أعلى الشمال أيقونة تبديل فوري حسب راحتك البصرية.</li>
        <li>📢 خانة الأخبار: احصل على آخر التحديثات (مثل إضافة أخبار هامة) مع علامة "جديد".</li>
        <li>📌تنبيه: عندما تكتب ملاحظة في خانة الملاحظات تأكد من أنك كتبت عنوان الملاحظة في الخانة العلوية وكتابة محتوى الملاحظة في الخانة السفلية لإن إذا تركت أي خانة منهما فارغة عندما تضغط على كلمة حفظ لن تحفظ.</li>
        <li>🔖 علامة "جديد": تظهر تلقائيًا بجانب كل ملف أو خبر جديد، وتختفي بعد المشاهدة.</li>
        <li>🟢النقطة الخضراء: تظهر النقطة الخضراء فوق أيقونة الأخبار تلقائيًا عند نزول أخبار جديدة وتختفي تلقائيًا بمجرد فتح جميع الأخبار.</li>
        <li>🟡النقطة الصفراء: تظهر النقطة الصفراء تلقائيًا في كلا من الخانة (المادة, الملفات, الصور, مجموعات الصور, الفيديوهات) عندما ينزل ملف أو صورة أو فيديو جديد وتختفي تلقائيًا بمجرد الضغط على علامة العين أو تنزيل كل المحتوى الجديد.</li>
        <li>📱 دعم كامل للموبايل والكمبيوتر: واجهة متجاوبة تعمل بسلاسة على جميع الأجهزة.</li>
      </ul>
      
      <h3 className="text-xl font-bold mb-3 text-gray-800">كيف تستخدم الموقع؟</h3>
      <ol className="space-y-2 mb-6 text-gray-700">
        <li>اختر فرقتك ← الترم ← المادة.</li>
        <li>اضغط على "عين" للمعاينة أو "تنزيل" للحفظ.</li>
        <li>استخدم دفتر الملاحظات (أيقونة 📓 في الزاوية اليمنى السفلية) لكتابة ملاحظاتك.</li>
        <li>تابع الأخبار (أيقونة 📢 في الزاوية اليسرى السفلية) لأحدث التحديثات.</li>
        <li>💡ولا تنسي تقييم الموقع من خلال الضغط على زر الـFeedback التي بأسفل الصفحة لكي تساهم في تطوير الموقع للأفضل❤</li>
      </ol>
      
      <p className="text-center italic text-gray-600">
        الموقع مجاني وآمن 100%، لا يتطلب تسجيل دخول، وتم تطويره من الطالب يوسف أحمد صالح لخدمة زملائي طلاب كلية التربية.
      </p>
    </div>
  </div>
)}
<h1
  className="text-4xl font-bold text-center pl-10"
  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
>
  <span className="block text-2xl">College Files</span>
  <span className="block text-3xl">Website</span>
</h1>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-full transition-all duration-500 transform hover:scale-125 hover:rotate-12 ${darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-700 hover:bg-gray-800'}`}
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>
          <p className={`text-center mt-4 text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>موقع ملفات كلية التربية شعبة اللغة العربية جامعة أسيوط</p>
          <p className={`text-center mt-4 text-medium font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>هذا الموقع مُبرمَج لتجميع ملفات المواد التي تخص الكلية وفيديوهات تلخيص المواد والأسئلة بالذكاء الاصطناعي في مكان واحد ليسهل على الطالب إيجادها</p>
          <p className={`text-center mt-4 text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ولا تنسونا من صالح الدعاء والدعاء لوالدتي بالرحمة 🤲</p>
        </div>
      </header>
      
      {/* خانة الملاحظات الشخصية */}
      <div className={`fixed bottom-6 right-6 z-50 ${isNewsPanelOpen || showHelp ? 'hidden' : ''}`}>
        {!isNotePanelOpen ? (
          <button
            onClick={openNotePanel}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${
              darkMode ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
            aria-label="فتح الملاحظات"
          >
            <Notebook size={24} />
          </button>
        ) : (
          <div className={`rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            {/* شريط العنوان */}
            <div className={`flex items-center justify-between p-3 ${
              darkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              {isCreatingNote || isViewingNote || isEditingNote ? (
                <button
                  onClick={() => {
                    setIsCreatingNote(false);
                    setIsViewingNote(false);
                    setIsEditingNote(false);
                    setCurrentNote({ title: '', content: '' });
                    setSelectedNoteId(null);
                  }}
                  className={`p-1 rounded-full ${
                    darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="رجوع"
                >
                  <ArrowLeft size={20} />
                </button>
              ) : (
                <span className={`font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  ملاحظاتي
                </span>
              )}
              <button
                onClick={closeNotePanel}
                className={`p-1 rounded-full ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* محتوى الملاحظات */}
            <div className="p-4 max-h-96 overflow-y-auto" style={{ width: '320px' }}>
              {isCreatingNote ? (
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      عنوان الملاحظة
                    </label>
                    <input
                      type="text"
                      value={currentNote.title}
                      onChange={(e) => handleNoteInputChange('title', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="أدخل عنوان الملاحظة"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      المحتوى
                    </label>
                    <textarea
                      value={currentNote.content}
                      onChange={(e) => handleNoteInputChange('content', e.target.value)}
                      rows="6"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="اكتب ملاحظاتك هنا..."
                    />
                  </div>
                  <button
                    onClick={saveNote}
                    className={`w-full py-2 rounded-lg font-medium ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors duration-200`}
                  >
                    حفظ الملاحظة
                  </button>
                </div>
              ) : isEditingNote ? (
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      عنوان الملاحظة
                    </label>
                    <input
                      type="text"
                      value={currentNote.title}
                      onChange={(e) => handleNoteInputChange('title', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="أدخل عنوان الملاحظة"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      المحتوى
                    </label>
                    <textarea
                      value={currentNote.content}
                      onChange={(e) => handleNoteInputChange('content', e.target.value)}
                      rows="6"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="اكتب ملاحظاتك هنا..."
                    />
                  </div>
                  <button
                    onClick={saveEditedNote}
                    className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'
                    } text-white transition-colors duration-200`}
                  >
                    <Save size={18} />
                    حفظ التعديل
                  </button>
                </div>
              ) : isViewingNote ? (
                <div className="space-y-3">
                  <h3 className={`text-lg font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {currentNote.title}
                  </h3>
                  <p className={`whitespace-pre-wrap ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {currentNote.content}
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {currentNote.createdAt}
                    {currentNote.editedAt && ` (عُدّل في: ${currentNote.editedAt})`}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={startEditingNote}
                      className={`flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                        darkMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-600 hover:bg-amber-700'
                      } text-white transition-colors duration-200`}
                    >
                      <Edit3 size={18} />
                      تعديل
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {notes.length === 0 ? (
                    <p className={`text-center py-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      لا توجد ملاحظات بعد
                    </p>
                  ) : (
                    notes.map(note => (
                      <div 
                        key={note.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                          darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => viewNote(note)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {note.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              requestDeleteNote(note);
                            }}
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'
                            } text-white`}
                            aria-label="حذف الملاحظة"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <p className={`text-sm mt-1 line-clamp-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {note.content}
                        </p>
                        <p className={`text-xs mt-2 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {note.createdAt}
                        </p>
                      </div>
                    ))
                  )}
                  
                  {/* زر إضافة ملاحظة جديدة */}
                  <button
                    onClick={openCreateNote}
                    className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'
                    } text-white transition-colors duration-200`}
                  >
                    <Plus size={18} />
                    إضافة ملاحظة
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* خانة الأخبار (ميغافون) */}
      <div className={`fixed bottom-6 left-6 z-50 ${isNotePanelOpen || showHelp ? 'hidden' : ''}`}>
        {!isNewsPanelOpen ? (
          <button
            onClick={openNewsPanel}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${
              darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
            } text-white`}
            aria-label="فتح الأخبار"
          >
            <Megaphone size={24} />
  {news.some(item => item.isNew && !viewedNews.includes(item.id)) && (
    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
  )}
          </button>
        ) : (
          <div className={`rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            {/* شريط العنوان */}
            <div className={`flex items-center justify-between p-3 ${
              darkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              {isViewingNews ? (
                <button
                  onClick={() => {
                    setIsViewingNews(false);
                    setCurrentNews(null);
                  }}
                  className={`p-1 rounded-full ${
                    darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="رجوع"
                >
                  <ArrowLeft size={20} />
                </button>
              ) : (
                <span className={`font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  الأخبار
                </span>
              )}
              <button
                onClick={closeNewsPanel}
                className={`p-1 rounded-full ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* محتوى الأخبار */}
            <div className="p-4 max-h-96 overflow-y-auto" style={{ width: '320px' }}>
              {isViewingNews ? (
                <div className="space-y-3">
                  <h3 className={`text-lg font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {currentNews.title}
                  </h3>
                  <p className={`whitespace-pre-wrap ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {currentNews.content}
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {new Date(currentNews.date).toLocaleDateString('ar-EG')}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {news.length === 0 ? (
                    <p className={`text-center py-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      لا توجد أخبار حالياً
                    </p>
                  ) : (
                    news.map(item => (
                      <div 
                        key={item.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                          darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => viewNews(item)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.title}
                          </h4>
                          {item.isNew && !viewedNews.includes(item.id) && (
                            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
                              جديد
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 line-clamp-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {item.content.substring(0, 100)}...
                        </p>
                        <p className={`text-xs mt-2 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {new Date(item.date).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* نافذة تأكيد الحذف */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-sm w-full`}>
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              تأكيد الحذف
            </h3>
            <p className={`mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              هل أنت متأكد من أنك تريد حذف هذه الملاحظة؟ هذا الإجراء لا يمكن التراجع عنه.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDeleteNote}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
              >
                حذف
              </button>
              <button
                onClick={cancelDeleteNote}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {years.map((year) => (
            <div key={year.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl`}>
              <div
                onClick={() => toggleYear(year.id)}
                className={`${darkMode ? 'bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700' : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'} text-white p-6 cursor-pointer transition-all duration-300 flex items-center justify-between transform hover:scale-[1.01]`}
              >
                <h2 className="text-3xl font-bold flex items-center gap-3">
  <span className="bg-white/20 p-2 rounded-lg">
    <GraduationCap size={24} />
  </span>
  {year.name}
</h2>
                <ChevronDown size={36} className="transition-all duration-500" style={{ transform: expandedYears[year.id] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </div>
              <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedYears[year.id] ? '30000px' : '0', opacity: expandedYears[year.id] ? '1' : '0' }}>
                <div className="p-6 space-y-5">
                  {terms.map((term) => (
                    <div key={term.id}>
                      <div
                        onClick={() => toggleTerm(year.id, term.id)}
                        className={`${darkMode ? 'bg-green-700 hover:bg-red-700' : 'bg-blue-100 hover:bg-blue-200'} p-5 rounded-xl cursor-pointer transition-all duration-500 flex items-center justify-between transform hover:scale-[1.02] hover:shadow-lg`}
                      >
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{term.name}</h3>
                        <ChevronDown size={28} className="transition-all duration-500" style={{ transform: expandedTerms[`${year.id}-${term.id}`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                      </div>
                      <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedTerms[`${year.id}-${term.id}`] ? '20000px' : '0', opacity: expandedTerms[`${year.id}-${term.id}`] ? '1' : '0' }}>
                        <div className="mt-4 space-y-4 mr-4">
                          {subjects[year.id][term.id].filter(subject => subject.name.toLowerCase().includes(searchQuery.toLowerCase())).map((subject) => (
                            <div key={subject.id} className={`${darkMode ? 'bg-gray-600' : 'bg-white'} rounded-xl shadow-md transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl`}>
                              <div
                                onClick={() => toggleSubject(subject.id)}
                                className={`${darkMode ? 'bg-gray-700 hover:bg-gray-700' : 'bg-green-100 hover:bg-green-200'} p-4 rounded-xl cursor-pointer transition-all duration-500 flex items-center justify-between transform hover:scale-[1.01]`}
                              >
                                <div className="flex items-center gap-3">
                                  <FolderOpen size={24} className={darkMode ? 'text-teal-400' : 'text-green-600'} />
                                  <div className="flex items-center gap-2">
  <h4 className={`text-xl font-bold pl-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{subject.name}</h4>
  
  {/* النقطة الصفراء للمادة - تظهر عند وجود ملفات جديدة */}
  {hasNewItemsInSubject(subject) && (
    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse pl-2 translate-x-2"></span>
  )}
</div>
                                </div>
                                <ChevronDown size={24} className="transition-all duration-500" style={{ transform: expandedSubjects[subject.id] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                              </div>
                              <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSubjects[subject.id] ? '8000px' : '0', opacity: expandedSubjects[subject.id] ? '1' : '0' }}>
                                <div className="p-4 space-y-4">
                                  {subject.files.length > 0 && (
                                    <div>
                                      <div
                                        onClick={() => toggleSection(subject.id, 'files')}
                                        className={`flex items-center justify-between p-3 ${darkMode ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-800 hover:bg-blue-700'} rounded-lg cursor-pointer transition-all duration-500 transform hover:scale-[1.02]`}
                                      >
                                        <h5 className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-100'} flex items-center gap-2`}>
  <FileText size={20} className="text-blue-600" />
  الملفات ({subject.files.length})
  {hasNewItemsInSection(subject.files) && (
    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></span>
  )}
</h5>
                                        <ChevronDown size={20} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-files`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                      </div>
                                      <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-files`] ? '6000px' : '0', opacity: expandedSections[`${subject.id}-files`] ? '1' : '0' }}>
                                        <div className="mt-3 space-y-2">
                                          {subject.files.map((file, idx) => (
                                            <div key={idx} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-blue-50'} rounded-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-md`}>
                                              <div className="flex items-center gap-2 flex-1">
                                                <FileText size={18} className="text-blue-600" />
                                                <div>
                                                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                                    <span className="flex items-center gap-1">
                                                      {file.name}
                                                      {file.isNew && file.id && !newFilesSeen[file.id] && (
                                                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                                          جديد
                                                        </span>
                                                      )}
                                                    </span>
                                                  </p>
                                                  <p className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
  <span dir="ltr">{file.size}</span>
</p>
                                                </div>
                                              </div>
                                              <div className="flex gap-2 mr-4">
                                                <button onClick={() => openPreview(file, 'file')} className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110">
                                                  <Eye size={16} />
                                                </button>
                                                <a 
                                                  href={file.url && !file.url.startsWith('http')
                                                    ? `${process.env.PUBLIC_URL}${file.url}`
                                                    : file.url} 
                                                  download 
                                                  onClick={() => {
                                                    if (file.isNew && file.id) {
                                                      markFileAsSeen(file.id);
                                                    }
                                                  }}
                                                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 inline-flex"
                                                >
                                                  <Download size={16} />
                                                </a>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {subject.imageGroups.length > 0 && (
                                    <div>
                                      <div
                                        onClick={() => toggleSection(subject.id, 'images')}
                                        className={`flex items-center justify-between p-3 ${darkMode ? 'bg-green-800 hover:bg-green-700' : 'bg-green-800 hover:bg-green-700'} rounded-lg cursor-pointer transition-all duration-500 transform hover:scale-[1.02]`}
                                      >
                                        <h5 className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-100'} flex items-center gap-2`}>
  <Image size={20} className={darkMode ? 'text-teal-400' : 'text-green-600'} />
  الصور ({subject.imageGroups.reduce((sum, g) => sum + g.images.length, 0)})
  
  {/* النقطة الصفراء لقسم الصور */}
  {hasNewItemsInImageGroups(subject.imageGroups) && (
    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></span>
  )}
</h5>
                                        <ChevronDown size={20} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-images`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                      </div>
                                      <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-images`] ? '6000px' : '0', opacity: expandedSections[`${subject.id}-images`] ? '1' : '0' }}>
                                        <div className="mt-3 space-y-3">
                                          {subject.imageGroups.map((group, groupIdx) => (
                                            <div key={groupIdx}>
                                              <div
                                                onClick={() => toggleSection(subject.id, `imageGroup-${groupIdx}`)}
                                                className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-200'} rounded-lg cursor-pointer transition-all duration-500 transform hover:scale-[1.02]`}
                                              >
                                                <span className={`text-base font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} flex items-center gap-2`}>
  📁 {group.groupName} ({group.images.length})
  
  {/* النقطة الصفراء لمجموعة الصور */}
  {group.images?.some(img => img.isNew && img.id && !newFilesSeen[img.id]) && (
    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></span>
  )}
</span>
                                                <ChevronDown size={18} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                              </div>
                                              <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? '5000px' : '0', opacity: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? '1' : '0' }}>
                                                <div className="mt-2 mr-4 space-y-2">
                                                  {group.images.map((image, imgIdx) => (
                                                    <div key={imgIdx} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-green-50'} rounded-lg transition-all duration-300 transform hover:scale-[1.03] hover:shadow-md`}>
                                                      <div className="flex items-center gap-2 flex-1">
                                                        <Image size={18} className={darkMode ? 'text-teal-400' : 'text-green-600'} />
                                                        <div>
                                                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                                            <span className="flex items-center gap-1">
                                                              {image.name}
                                                              {image.isNew && image.id && !newFilesSeen[image.id] && (
                                                                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                                                  جديد
                                                                </span>
                                                              )}
                                                            </span>
                                                          </p>
                                                          <p className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
     <span dir="ltr">{image.size}</span>
   </p>
                                                        </div>
                                                      </div>
                                                      <div className="flex gap-2 mr-4">
                                                        <button onClick={() => openPreview(image, 'image')} className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110">
                                                          <Eye size={16} />
                                                        </button>
                                                        <a 
                                                          href={image.url && !image.url.startsWith('http')
                                                            ? `${process.env.PUBLIC_URL}${image.url}`
                                                            : image.url} 
                                                          download 
                                                          onClick={() => {
                                                            if (image.isNew && image.id) {
                                                              markFileAsSeen(image.id);
                                                            }
                                                          }}
                                                          className={`${darkMode ? 'bg-teal-600 hover:bg-teal-500' : 'bg-green-600 hover:bg-green-700'} text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 inline-flex`}
                                                        >
                                                          <Download size={16} />
                                                        </a>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {subject.videos.length > 0 && (
                                    <div>
                                      <div
                                        onClick={() => toggleSection(subject.id, 'videos')}
                                        className={`flex items-center justify-between p-3 ${darkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-700 hover:bg-red-600'} rounded-lg cursor-pointer transition-all duration-500 transform hover:scale-[1.02]`}
                                      >
                                        <h5 className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-100'} flex items-center gap-2`}>
  <Video size={20} className={darkMode ? 'text-pink-400' : 'text-red-600'} />
  الفيديوهات ({subject.videos.length})
  {hasNewItemsInSection(subject.videos) && (
    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></span>
  )}
</h5>
                                        <ChevronDown size={20} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-videos`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                      </div>
                                      <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-videos`] ? '999999px' : '0', opacity: expandedSections[`${subject.id}-videos`] ? '1' : '0' }}>
                                        <div className="mt-3 space-y-2">
                                          {subject.videos.map((video, idx) => (
                                            <div key={idx} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-red-50 hover:bg-red-100'} rounded-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-md`}>
                                              <div className="flex items-center gap-2 flex-1">
                                                <Video size={18} className={darkMode ? 'text-pink-400' : 'text-red-600'} />
                                                <div>
                                                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                                    <span className="flex items-center gap-1">
                                                      {video.name}
                                                      {video.isNew && video.id && !newFilesSeen[video.id] && (
                                                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                                          جديد
                                                        </span>
                                                      )}
                                                    </span>
                                                  </p>
                                                  <p className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>المدة: {video.duration}</p>
                                                  <p className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
     <span dir="ltr">{video.size}</span>
   </p>
                                                </div>
                                              </div>
                                              <div className="flex gap-2 mr-4">
                                                <button onClick={() => openPreview(video, 'video')} className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110">
                                                  <Eye size={16} />
                                                </button>
                                                <a 
                                                  href={video.url && !video.url.startsWith('http')
                                                    ? `${process.env.PUBLIC_URL}${video.url}`
                                                    : video.url} 
                                                  download 
                                                  onClick={() => {
                                                    if (video.isNew && video.id) {
                                                      markFileAsSeen(video.id);
                                                    }
                                                  }}
                                                  className={`${darkMode ? 'bg-pink-600 hover:bg-pink-500' : 'bg-red-600 hover:bg-red-700'} text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 inline-flex`}
                                                >
                                                  <Download size={16} />
                                                </a>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {previewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={closePreview}>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto relative`} onClick={(e) => e.stopPropagation()}>
            <button onClick={closePreview} className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
              <X size={24} />
            </button>
            <div className="p-6">
              <h3 className={`text-2xl font-bold mb-4 pl-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{previewItem.name}</h3>
              <div className={`p-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg text-center`}>
                {previewItem.type === 'file' && (
  <>
    {/* زر عرض الملف كامل */}
    {previewItem.url && (
      <a 
        href={previewItem.url} 
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block mt-4 px-6 py-3 rounded-lg font-medium ${
          darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
        } text-white transition-colors duration-200`}
      >
        عرض الملف كامل
      </a>
    )}
  </>
)}
                {previewItem.type === 'image' && (
                  <>
                    {previewItem.url ? (
                      <img 
                        src={previewItem.url} 
                        alt={previewItem.name}
                        className="w-full h-auto rounded-lg mb-4"
                      />
                    ) : (
                      <>
                        <Image size={64} className="mx-auto mb-4 text-green-600" />
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>صورة - {previewItem.size}</p>
                      </>
                    )}
                  </>
                )}
                {previewItem.type === 'video' && (
                  <>
                    {previewItem.url ? (
                      <video 
                        src={previewItem.url} 
                        controls
                        className="w-full h-auto rounded-lg mb-4"
                      >
                        متصفحك لا يدعم تشغيل الفيديو
                      </video>
                    ) : (
                      <>
                        <Video size={64} className="mx-auto mb-4 text-red-600" />
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>فيديو - {previewItem.duration}</p>
                      </>
                    )}
                  </>
                )}
              </div>
              {previewItem.url && (
                <a 
                  href={previewItem.url} 
                  download
                  className={`w-full mt-4 ${previewItem.type === 'file' ? 'bg-blue-600' : previewItem.type === 'image' ? 'bg-green-600' : 'bg-red-600'} hover:opacity-90 text-white py-3 rounded-lg flex items-center justify-center gap-2`}
                >
                  <Download size={20} />
                  تحميل
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      <footer className="bg-gray-800 text-white mt-2.5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm mt-1">مبرمج هذا الموقع: يوسف أحمد صالح</p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSexdXzeXl8kGW2Oo-11IuFSIrWxFElegE7xlc2PqtaYQUitgw/viewform" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="font-semibold">أرسل Feedback</span>
          </a>
          <p className="text-xs text-gray-400 mt-2">جميع الحقوق محفوظة © 2025</p>
        </div>
      </footer>
    </div>
  );
}