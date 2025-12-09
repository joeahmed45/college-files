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
  
  // تعليم خبر كـ "تم رؤيته"
  const markNewsAsViewed = (newsId) => {
    if (!viewedNews.includes(newsId)) {
      setViewedNews(prev => [...prev, newsId]);
    }
  };
  
  // هذه هي الأخبار الثابتة - قم بتعديلها مباشرة في الكود
  const news = [
    {
      id: 'news-1',
      title: 'إعلان هام: مواعيد الامتحانات النهائية',
      content: 'تنبيه لجميع طلاب الفرقة الأولى: مواعيد الامتحانات النهائية للفصل الدراسي الأول سوف تبدأ من يوم الأحد 15 يناير 2025. يرجى التأكد من جداول الامتحانات المعلنة على لوحة الإعلانات.',
      date: '2024-12-01',
      isNew: true
    },
    {
      id: 'news-2',
      title: 'ورشة عمل: كيفية استخدام الموقع',
      content: 'سنوفر ورشة عمل يوم الخميس القادم الساعة 2 ظهرًا لشرح كيفية استخدام هذا الموقع للاستفادة القصوى من الملفات والموارد المتاحة. الحضور اختياري ولكن موصى به بشدة.',
      date: '2024-11-28',
      isNew: true
    },
    {
      id: 'news-3',
      title: 'تحديث جديد: إضافة ملفات البلاغة',
      content: 'تم إضافة ملفات جديدة لمادة البلاغة العربية للفرقة الأولى، تشمل ملخصات شاملة وأسئلة امتحانات السنوات السابقة. نتمنى لكم التوفيق والنجاح.',
      date: '2024-11-25',
      isNew: true
    }
  ];
  
  const subjects = {
    first: {
      first: [
        {
          id: 'f1-t1-s1',
          name: 'مدخل إلى الأدب العربي د. حنان أبو قاسم',
          files: [
            { 
              id: 'adab-book-001',
              name: 'مدخل إلى الأدب العربي الكتاب كامل', 
              size: '9.3 MB',
              url: '/files/year1/term1/adab/pdf/مدخل أدب عربي.pdf',
              isNew: true
            },
            { 
              id: 'adab-summary-001',
              name: 'تلخيص الأدب إلى صفحة ١٠٠ العام الماضي', 
              size: '9.3 MB',
              url: '/files/year1/term1/adab/pdf/تلخيص_الادب_لحد_ص_١٠٠.pdf',
              isNew: true
            },
            { 
              id: 'adab-mid-001',
              name: 'أدب مجموعة أولى', 
              size: '41 MB',
              url: '/files/year1/term1/adab/pdf/ميد ــ ادب مجموعه اولي.pdf',
              isNew: true
            },
            { 
              id: 'adab-mid-obj-001',
              name: 'أدب مجموعة أولى أسئلة موضوعية', 
              size: '1.4 MB',
              url: '/files/year1/term1/adab/pdf/موضوعي أدب مجموعه اولي.pdf',
              isNew: true
            },
            { 
              id: 'adab-poetry-001',
              name: 'مثال ملخص لنشأة الشعر', 
              size: '0.2 MB',
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
              groupName: 'مُقررات الميد',
              images: [
                { 
                  id: 'adab-mid-img-001',
                  name: 'مقرر امتحان أدب ميد مجموعة أولى', 
                  size: '240 KB',
                  url: '/files/year1/term1/adab/images/مقرر ميد مجموعة أولى.PNG',
                  isNew: true
                },
                { 
                  id: 'adab-sarf-img-001',
                  name: 'خريطة ذهنية للصرف', 
                  size: '750 KB',
                  url: '/files/year1/term1/adab/images/مقرر ميد مجموعة ثانية وثالثة.PNG',
                  isNew: true
                }
              ]
            }
          ],
          videos: [
            { 
              id: 'adab-video-001',
              name: 'فارغ', 
              duration: '00:00',
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
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'balagha-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'balagha-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s3',
          name: 'كذا',
          files: [
            { 
              id: 'subject3-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject3-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject3-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s4',
          name: 'كذا',
          files: [
            { 
              id: 'subject4-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject4-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject4-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s5',
          name: 'كذا',
          files: [
            { 
              id: 'subject5-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject5-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject5-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s6',
          name: 'كذا',
          files: [
            { 
              id: 'subject6-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject6-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject6-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s7',
          name: 'كذا',
          files: [
            { 
              id: 'subject7-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject7-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject7-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s8',
          name: 'كذا',
          files: [
            { 
              id: 'subject8-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject8-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject8-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s9',
          name: 'كذا',
          files: [
            { 
              id: 'subject9-file-001',
              name: ' مد خل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject9-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject9-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s10',
          name: 'كذا',
          files: [
            { 
              id: 'subject10-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject10-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject10-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s11',
          name: 'كذا',
          files: [
            { 
              id: 'subject11-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject11-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject11-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s12',
          name: 'كذا',
          files: [
            { 
              id: 'subject12-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject12-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject12-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s13',
          name: 'كذا',
          files: [
            { 
              id: 'subject13-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject13-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject13-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s14',
          name: 'كذا',
          files: [
            { 
              id: 'subject14-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject14-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject14-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
          ]
        },
        {
          id: 'f1-t1-s15',
          name: 'كذا',
          files: [
            { 
              id: 'subject15-file-001',
              name: 'مدخل', 
              size: ' MB',
              url: '/files/year1/term1/balagha/pdf/goma.pdf',
              isNew: true
            },
          ],
          imageGroups: [            
            {
              groupName: 'مُقررات',
              images: [
                { 
                  id: 'subject15-img-001',
                  name: 'مقرر', 
                  size: ' KB',
                  url: '/files/year1/term1/balagha/images/goma.PNG',
                  isNew: true
                },
              ]
            }
          ],
          videos: [
            { 
              id: 'subject15-video-001',
              name: 'فارغ', 
              duration: '00:00',
              url: '/files/year1/term1/adab/videos/فارغ.mp4',
              isNew: true
            }
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
    setExpandedSubjects(prev => ({ ...prev, [subjectId]: !prev[subjectId] }));
  };
  const toggleSection = (subjectId, section) => {
    const key = `${subjectId}-${section}`;
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
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
        createdAt: new Date().toLocaleString('ar-EG')
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
          <p className={`text-center mt-4 text-medium font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>هذا الموقع مُبرمَج لتجميع ملفات المواد التي تخص الكلية وفيديوهات تلخيص المواد بالذكاء الاصطناعي في مكان واحد كي يسهل على الطالب إيجادها</p>
          <p className={`text-center mt-4 text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ولا تنسونا من صالح الدعاء والدعاء لوالدتي بالرحمة 🤲</p>
        </div>
      </header>
      
      {/* خانة الملاحظات الشخصية */}
      <div className={`fixed bottom-6 right-6 z-50 ${isNewsPanelOpen ? 'hidden' : ''}`}>
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
      <div className={`fixed bottom-6 left-6 z-50 ${isNotePanelOpen ? 'hidden' : ''}`}>
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
              <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedYears[year.id] ? '5000px' : '0', opacity: expandedYears[year.id] ? '1' : '0' }}>
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
                      <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedTerms[`${year.id}-${term.id}`] ? '5000px' : '0', opacity: expandedTerms[`${year.id}-${term.id}`] ? '1' : '0' }}>
                        <div className="mt-4 space-y-4 mr-4">
                          {subjects[year.id][term.id].filter(subject => subject.name.toLowerCase().includes(searchQuery.toLowerCase())).map((subject) => (
                            <div key={subject.id} className={`${darkMode ? 'bg-gray-600' : 'bg-white'} rounded-xl shadow-md transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl`}>
                              <div
                                onClick={() => toggleSubject(subject.id)}
                                className={`${darkMode ? 'bg-gray-700 hover:bg-gray-700' : 'bg-green-100 hover:bg-green-200'} p-4 rounded-xl cursor-pointer transition-all duration-500 flex items-center justify-between transform hover:scale-[1.01]`}
                              >
                                <div className="flex items-center gap-3">
                                  <FolderOpen size={24} className={darkMode ? 'text-teal-400' : 'text-green-600'} />
                                  <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{subject.name}</h4>
                                </div>
                                <ChevronDown size={24} className="transition-all duration-500" style={{ transform: expandedSubjects[subject.id] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                              </div>
                              <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSubjects[subject.id] ? '3000px' : '0', opacity: expandedSubjects[subject.id] ? '1' : '0' }}>
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
                                        </h5>
                                        <ChevronDown size={20} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-files`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                      </div>
                                      <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-files`] ? '2000px' : '0', opacity: expandedSections[`${subject.id}-files`] ? '1' : '0' }}>
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
                                                  <p className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>{file.size}</p>
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
                                        </h5>
                                        <ChevronDown size={20} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-images`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                      </div>
                                      <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-images`] ? '2000px' : '0', opacity: expandedSections[`${subject.id}-images`] ? '1' : '0' }}>
                                        <div className="mt-3 space-y-3">
                                          {subject.imageGroups.map((group, groupIdx) => (
                                            <div key={groupIdx}>
                                              <div
                                                onClick={() => toggleSection(subject.id, `imageGroup-${groupIdx}`)}
                                                className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-200'} rounded-lg cursor-pointer transition-all duration-500 transform hover:scale-[1.02]`}
                                              >
                                                <span className={`text-base font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} flex items-center gap-2`}>
                                                  📁 {group.groupName} ({group.images.length})
                                                </span>
                                                <ChevronDown size={18} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                              </div>
                                              <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? '1500px' : '0', opacity: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? '1' : '0' }}>
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
                                                          <p className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>{image.size}</p>
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
                                        </h5>
                                        <ChevronDown size={20} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-videos`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                      </div>
                                      <div className="overflow-visible transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-videos`] ? '2000px' : '0', opacity: expandedSections[`${subject.id}-videos`] ? '1' : '0' }}>
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
                                                  <p className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}> MB {video.size}</p>
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
      <footer className="bg-gray-800 text-white mt-0.5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm mt-1">مبرمج هذا الموقع: يوسف أحمد صالح</p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSexdXzeXl8kGW2Oo-11IuFSIrWxFElegE7xlc2PqtaYQUitgw/viewform" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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