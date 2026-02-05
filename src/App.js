import React, { useState, useEffect } from 'react';
import { BookOpen, Download, FolderOpen, FileText, ChevronDown, Image, Video, Moon, Sun, Eye, X, GraduationCap, Notebook, Plus, ArrowLeft, Megaphone, Edit3, Save, ClipboardCheck } from 'lucide-react';

// استيراد بيانات السنوات من ملفات منفصلة
import { firstYear } from './data/years/firstYear';
import { secondYear } from './data/years/secondYear';
import { thirdYear } from './data/years/thirdYear';
import { fourthYear } from './data/years/fourthYear';

const subjects = {
  first: firstYear,
  second: secondYear,
  third: thirdYear,
  fourth: fourthYear
};

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
  // eslint-disable-next-line no-unused-vars
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
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [tempEditedNote, setTempEditedNote] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [noteErrors, setNoteErrors] = useState({ title: '', content: '' });
  // حالات الاختبارات
// حالات الاختبارات
// حالات الاختبارات
const [activeQuiz, setActiveQuiz] = useState(null);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [userAnswers, setUserAnswers] = useState({});
const [showResults, setShowResults] = useState({});
const [quizSubmitted, setQuizSubmitted] = useState(false);
const [viewedQuizzes, setViewedQuizzes] = useState(() => {
  try {
    const saved = localStorage.getItem('viewedQuizzes');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});
const [quizProgress, setQuizProgress] = useState(() => {
  try {
    const saved = localStorage.getItem('quizProgress');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
});

const [quizHistory, setQuizHistory] = useState(() => {
  try {
    const saved = localStorage.getItem('quizHistory');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
});
const [showHistory, setShowHistory] = useState(false);
const [showDeleteHistoryConfirm, setShowDeleteHistoryConfirm] = useState(false);
const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  
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
    localStorage.setItem('viewedQuizzes', JSON.stringify(viewedQuizzes));
  } catch (error) {
    console.error('خطأ في حفظ viewedQuizzes:', error);
  }
}, [viewedQuizzes]);
useEffect(() => {
  try {
    localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
  } catch (error) {
    console.error('خطأ في حفظ quizProgress:', error);
  }
}, [quizProgress]);
useEffect(() => {
  try {
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
  } catch (error) {
    console.error('خطأ في حفظ quizHistory:', error);
  }
}, [quizHistory]);

// حفظ تقدم الاختبار الحالي
useEffect(() => {
  if (activeQuiz && Object.keys(userAnswers).length > 0) {
    setQuizProgress(prev => ({
      ...prev,
      [activeQuiz.id]: {
        currentQuestionIndex,
        userAnswers,
        showResults,
        quizSubmitted,
        lastUpdated: Date.now()
      }
    }));
  }
}, [activeQuiz, currentQuestionIndex, userAnswers, showResults, quizSubmitted]);
  // منع scroll الصفحة الرئيسية عند فتح أي خانة (ملاحظات، أخبار، مساعدة، اختبارات)
useEffect(() => {
  if (isNotePanelOpen || isNewsPanelOpen || showHelp || activeQuiz) {
    // منع scroll للصفحة الرئيسية
    document.body.style.overflow = 'hidden';
  } else {
    // السماح بـ scroll للصفحة الرئيسية
    document.body.style.overflow = 'unset';
  }
  
  // تنظيف عند إلغاء المكون
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isNotePanelOpen, isNewsPanelOpen, showHelp, activeQuiz]);
  
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
  const hasNewQuizzes = subject.quizzes?.some(q => q.isNew && !viewedQuizzes.includes(q.id));
  
  return hasNewFiles || hasNewImages || hasNewVideos || hasNewQuizzes;
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
      id: 'new-5',
      title: 'ملفات الترم االثاني فرقة أولى',
      content: 'تم بفضل الله رفع أغلب كتب الترم الثاني الفرقة الأولى لكن بعض من الملفات تالفة وننتظر نزول الملفات السليمة من الكلية.',
      date: '2026-2-4',
      isNew: true
    },
    {
      id: 'new-4',
      title: 'ميزة جديدة',
      content: 'تم إضافة ميزة جديدة وهي ميزة الاختبارات الالكترونية حيث يمكنك أن تحل اختبارات على المواد داخل خانة المادة وتُصحح تلقائي وتعرف الإجابات الصح والخطأ وفي النهاية عند الضغط على تسليم الاختبار سيظهر النتائج والإحصائيات كلها ويمكنك إعادة الاختبار بعد أو أثناء الاختبار من خلال الضغط على زر إعادة الاختبار.',
      date: '2026-1-4',
      isNew: true
    },
    {
      id: 'new-3',
      title: 'تلخيصات نصف المواد',
      content: 'تم إضافة تخليصات نصف مواد الترم الأول، أنتظروا باقي النصف الأخر.',
      date: '2025-12-28',
      isNew: true
    },
    {
      id: 'new-2',
      title: 'إضافة تلخيصات الفاينال',
      content: 'تم إضافة تلخيص مادة القضايا المجتمعية كاملةً وسيتم إضافة باقي المواد قريبًا إن شاء الله.',
      date: '2025-12-16',
      isNew: true
    },
  ];
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
  } else {
    // عند إغلاق المادة، أغلق جميع الأقسام الداخلية (الملفات، الصور، الفيديوهات)
    setExpandedSections(prev => {
      const updated = { ...prev };
      // إغلاق قسم الملفات
      delete updated[`${subjectId}-files`];
      // إغلاق قسم الصور
      delete updated[`${subjectId}-images`];
      // إغلاق قسم الفيديوهات
      delete updated[`${subjectId}-videos`];
      // إغلاق قسم الاختبارات
      delete updated[`${subjectId}-quizzes`];
      
      // إغلاق جميع مجموعات الصور التابعة لهذه المادة
      Object.keys(updated).forEach(key => {
        if (key.startsWith(`${subjectId}-imageGroup-`)) {
          delete updated[key];
        }
      });
      
      return updated;
    });
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
  let hasError = false;
  const errors = { title: '', content: '' };
  
  if (!currentNote.title.trim()) {
    errors.title = '⚠️ يرجى كتابة عنوان الملاحظة';
    hasError = true;
  }
  
  if (!currentNote.content.trim()) {
    errors.content = '⚠️ يرجى كتابة محتوى الملاحظة';
    hasError = true;
  }
  
  setNoteErrors(errors);
  
  if (hasError) {
    return;
  }
  
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
  setNoteErrors({ title: '', content: '' });
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
  let hasError = false;
  const errors = { title: '', content: '' };
  
  if (!currentNote.title.trim()) {
    errors.title = '⚠️ يرجى كتابة عنوان الملاحظة';
    hasError = true;
  }
  
  if (!currentNote.content.trim()) {
    errors.content = '⚠️ يرجى كتابة محتوى الملاحظة';
    hasError = true;
  }
  
  setNoteErrors(errors);
  
  if (hasError) {
    return;
  }
  
  // حفظ البيانات المعدلة مؤقتاً وإظهار نافذة التأكيد
  setTempEditedNote(currentNote);
  setShowEditConfirm(true);
};

const confirmEditNote = () => {
  if (tempEditedNote) {
    // تحديث الملاحظة ونقلها لأول القائمة
    setNotes(prev => {
      const updatedNote = {
        ...tempEditedNote,
        editedAt: new Date().toLocaleString('ar-EG', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      // إزالة الملاحظة القديمة من مكانها ووضعها في الأول
      const filteredNotes = prev.filter(note => note.id !== tempEditedNote.id);
      return [updatedNote, ...filteredNotes];
    });
    
    setShowEditConfirm(false);
    setTempEditedNote(null);
    setIsEditingNote(false);
    setIsViewingNote(true);
    setNoteErrors({ title: '', content: '' });
  }
};

const cancelEditNote = () => {
  setShowEditConfirm(false);
  setTempEditedNote(null);
  // البقاء في وضع التعديل - لا يتم حفظ أي شيء
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
    // إزالة رسالة الخطأ عند الكتابة
    if (noteErrors[field]) {
      setNoteErrors(prev => ({ ...prev, [field]: '' }));
    }
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
  
// دوال الاختبارات
const openQuiz = (quiz) => {
  setActiveQuiz(quiz);
  setShowHistory(false); // إضافة هذا السطر لإغلاق السجل تلقائياً

  // استعادة التقدم السابق إن وُجد
  const savedProgress = quizProgress[quiz.id];
  if (savedProgress && !savedProgress.quizSubmitted) {
    setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
    setUserAnswers(savedProgress.userAnswers || {});
    setShowResults(savedProgress.showResults || {});
    setQuizSubmitted(false);
  } else {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults({});
    setQuizSubmitted(false);
  }
  
  // تعليم الاختبار كمُشاهد
  if (!viewedQuizzes.includes(quiz.id)) {
    setViewedQuizzes(prev => [...prev, quiz.id]);
  }
};

const closeQuiz = () => {
  setActiveQuiz(null);
  setCurrentQuestionIndex(0);
  setUserAnswers({});
  setShowResults({});
  setQuizSubmitted(false);
};

const handleAnswerSelect = (questionId, selectedAnswer, correctAnswer) => {
  if (quizSubmitted) return; // منع التعديل بعد التسليم
  if (userAnswers[questionId] !== undefined) return; // منع تغيير الإجابة
  
  setUserAnswers(prev => ({
    ...prev,
    [questionId]: selectedAnswer
  }));
  
  setShowResults(prev => ({
    ...prev,
    [questionId]: selectedAnswer === correctAnswer
  }));
};

const nextQuestion = () => {
  if (currentQuestionIndex < activeQuiz.questions.length - 1) {
    setCurrentQuestionIndex(prev => prev + 1);
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(prev => prev - 1);
  }
};

const getQuizScore = () => {
  const totalQuestions = activeQuiz.questions.length;
  const correctAnswers = Object.values(showResults).filter(result => result === true).length;
  const percentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(1) : 0;
  return { correct: correctAnswers, total: totalQuestions, percentage };
};

const submitQuiz = () => {
  setQuizSubmitted(true);
  
  // حفظ النتيجة في السجل
  if (activeQuiz) {
    const score = getQuizScore();
    const attemptData = {
      date: new Date().toLocaleString('ar-EG', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      percentage: score.percentage,
      correct: score.correct,
      total: score.total,
      answers: { ...userAnswers },
      results: { ...showResults }
    };
    
    setQuizHistory(prev => ({
      ...prev,
      [activeQuiz.id]: [
        ...(prev[activeQuiz.id] || []),
        attemptData
      ]
    }));
    
    // حذف التقدم المحفوظ بعد التسليم
    setQuizProgress(prev => {
      const updated = { ...prev };
      delete updated[activeQuiz.id];
      return updated;
    });
  }
};

const restartQuiz = () => {
  setCurrentQuestionIndex(0);
  setUserAnswers({});
  setShowResults({});
  setQuizSubmitted(false);
  
  // حذف التقدم المحفوظ
  if (activeQuiz) {
    setQuizProgress(prev => {
      const updated = { ...prev };
      delete updated[activeQuiz.id];
      return updated;
    });
  }
};

const confirmRestartQuiz = () => {
  restartQuiz();
  setShowRestartConfirm(false);
};

const deleteQuizHistory = () => {
  if (activeQuiz) {
    setQuizHistory(prev => {
      const updated = { ...prev };
      delete updated[activeQuiz.id];
      return updated;
    });
    setShowHistory(false);
    setShowDeleteHistoryConfirm(false);
  }
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
      
      <p className="text-center mb-2 text-gray-600">
        مرحباً بك في موقعك الشامل لتجميع جميع مواردك الدراسية في مكان واحد!
      </p>
      <p className="text-center mb-2 text-gray-600">
       هذا الموقع مُبرمَج لتجميع ملفات المواد التي تخص الكلية وفيديوهات تلخيص المواد والأسئلة بالذكاء الاصطناعي في مكان واحد ليسهل على الطالب إيجادها
      </p>
      
      <h3 className="text-xl font-bold mb-3 text-gray-800">أبرز المميزات:</h3>
      <ul className="space-y-2 mb-6 text-gray-700">
        <li>👁️ زر "العين": معاينة سريعة لأي ملف (PDF، صورة، فيديو) قبل التنزيل.</li>
        <li>⬇️ زر "التنزيل": تحميل مباشر لأي ملف بضغطة واحدة.</li>
        <li>📝 دفتر الملاحظات: أضف ملاحظاتك الشخصية، عدّلها، واحفظها محلياً  على جهازك ولا نستطيع رؤية ما كتبته — لن تُحذف حتى بعد الخروج!</li>
        <li>🌙 الوضع الليلي/النهاري: في أعلى الشمال أيقونة تبديل فوري حسب راحتك البصرية.</li>
        <li>📢 خانة الأخبار: احصل على آخر التحديثات (مثل إضافة أخبار هامة) مع علامة "جديد".</li>
        <li>🔖 علامة "جديد": تظهر تلقائيًا بجانب كل ملف أو خبر جديد، وتختفي بعد المشاهدة.</li>
        <li>🟢 النقطة الخضراء: تظهر النقطة الخضراء فوق أيقونة الأخبار تلقائيًا عند نزول أخبار جديدة وتختفي تلقائيًا بمجرد فتح جميع الأخبار.</li>
        <li>🟡 النقطة الصفراء: تظهر النقطة الصفراء تلقائيًا في كلا من الخانة (المادة, الملفات, الصور, مجموعات الصور, الفيديوهات) عندما ينزل ملف أو صورة أو فيديو جديد وتختفي تلقائيًا بمجرد الضغط على علامة العين أو تنزيل كل المحتوى الجديد.</li>
        <li>📱 دعم كامل للموبايل والكمبيوتر: واجهة متجاوبة تعمل بسلاسة على جميع الأجهزة.</li>
        <li>✍ الاختبارات: يمكنك أن تحل اختبارات على المواد داخل خانة المادة وتُصحح تلقائي وتعرف الإجابات الصح والخطأ وفي النهاية عند الضغط على تسليم الاختبار سيظهر النتائج والإحصائيات كلها ويمكنك إعادة الاختبار بعد أو أثناء الاختبار.</li>
      </ul>
      
      <h3 className="text-xl font-bold mb-3 text-gray-800">كيف تستخدم الموقع؟</h3>
      <ol className="space-y-2 mb-6 text-gray-700">
        <li>اختر فرقتك ← الترم ← المادة.</li>
        <li>اضغط على "عين" للمعاينة أو "تنزيل" للحفظ.</li>
        <li>استخدم دفتر الملاحظات (أيقونة 📓 في الزاوية اليمنى السفلية) لكتابة ملاحظاتك.</li>
        <li>تابع الأخبار (أيقونة 📢 في الزاوية اليسرى السفلية) لأحدث التحديثات.</li>
        <li>💡ولا تنسي تقييم الموقع من خلال الضغط على زر الـFeedback أو التغذية الراجعة التي بأسفل الصفحة لكي تساهم في تطوير الموقع للأفضل❤</li>
      </ol>
      
      <p className="text-center italic mb-2 text-gray-600">
        الموقع مجاني وآمن ١٠٠٪، ولا يتطلب تسجيل دخول أو أذونات.
      </p>
      <p className="text-center italic mb-2 text-gray-600">تم تطوير الموقع من الطالب يوسف أحمد صالح لخدمة زملائي طلاب كلية التربية.
      </p>
      <p className="text-center italic text-gray-600">
        صلوا على النبي محمد ﷺ ولا تنسونا من صالح الدعاء والدعاء لوالدتي بالرحمة. 🤲
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
          <p className={`text-center mt-6 mb-2 text-lg font-bold ${darkMode ? 'text-white' : 'text-white'}`}>موقع ملفات كلية التربية شعبة اللغة العربية جامعة أسيوط</p>
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
            <div className="p-4" style={{ width: '320px', height: '384px', display: 'flex', flexDirection: 'column' }}>
              {isCreatingNote ? (
                <div className="space-y-3 flex flex-col h-full">
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
                        noteErrors.title 
                          ? 'border-red-500 focus:ring-red-500' 
                          : darkMode 
                          ? 'border-gray-600 focus:ring-blue-500' 
                          : 'border-gray-300 focus:ring-blue-500'
                      } ${
                        darkMode 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-white text-gray-900'
                      } focus:outline-none focus:ring-2`}
                      placeholder="أدخل عنوان الملاحظة"
                    />
                    {noteErrors.title && (
                      <p className="text-red-500 text-sm mt-1">{noteErrors.title}</p>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      المحتوى
                    </label>
                    <textarea
                      value={currentNote.content}
                      onChange={(e) => handleNoteInputChange('content', e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-lg border resize-none ${
                        noteErrors.content 
                          ? 'border-red-500 focus:ring-red-500' 
                          : darkMode 
                          ? 'border-gray-600 focus:ring-blue-500' 
                          : 'border-gray-300 focus:ring-blue-500'
                      } ${
                        darkMode 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-white text-gray-900'
                      } focus:outline-none focus:ring-2`}
                      placeholder="اكتب ملاحظاتك هنا..."
                    />
                    {noteErrors.content && (
                      <p className="text-red-500 text-sm mt-1">{noteErrors.content}</p>
                    )}
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
                <div className="flex flex-col h-full">
                  <div className="mb-3">
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
                        noteErrors.title 
                          ? 'border-red-500 focus:ring-red-500' 
                          : darkMode 
                          ? 'border-gray-600 focus:ring-blue-500' 
                          : 'border-gray-300 focus:ring-blue-500'
                      } ${
                        darkMode 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-white text-gray-900'
                      } focus:outline-none focus:ring-2`}
                      placeholder="أدخل عنوان الملاحظة"
                    />
                    {noteErrors.title && (
                      <p className="text-red-500 text-sm mt-1">{noteErrors.title}</p>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col mb-3" style={{ minHeight: '230px' }}>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      المحتوى
                    </label>
                    <textarea
                      value={currentNote.content}
                      onChange={(e) => handleNoteInputChange('content', e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-lg border resize-none ${
                        noteErrors.content 
                          ? 'border-red-500 focus:ring-red-500' 
                          : darkMode 
                          ? 'border-gray-600 focus:ring-blue-500' 
                          : 'border-gray-300 focus:ring-blue-500'
                      } ${
                        darkMode 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-white text-gray-900'
                      } focus:outline-none focus:ring-2`}
                      placeholder="اكتب ملاحظاتك هنا..."
                    />
                    {noteErrors.content && (
                      <p className="text-red-500 text-sm mt-1">{noteErrors.content}</p>
                    )}
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
                <div className="space-y-3 flex flex-col h-full">
                  <h3 className={`text-lg font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {currentNote.title}
                  </h3>
                  <div className="flex-1 overflow-y-auto">
                    <p className={`whitespace-pre-wrap ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {currentNote.content}
                    </p>
                  </div>
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
  <div className="flex flex-col h-full">
    <div className="flex-1 overflow-y-auto space-y-3 mb-3">
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
                          {note.editedAt && (
                            <span className={`mr-1 ${
                              darkMode ? 'text-amber-400' : 'text-amber-600'
                            }`}>
                              (عُدلت في: {note.editedAt})
                            </span>
                          )}
                        </p>
                      </div>
                    ))
    )}
    </div>
    
    {/* زر إضافة ملاحظة جديدة - ثابت في الأسفل */}
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
      {/* نافذة تأكيد التعديل */}
{showEditConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-sm w-full`}>
      <h3 className={`text-xl font-bold mb-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        تأكيد حفظ التعديل
      </h3>
      <p className={`mb-6 ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        هل أنت متأكد من أنك تريد حفظ التعديلات على هذه الملاحظة؟
      </p>
      <div className="flex gap-3">
        <button
          onClick={confirmEditNote}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
        >
          حفظ التعديل
        </button>
        <button
          onClick={cancelEditNote}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors duration-200 ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          إلغاء
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
                              <div className="transition-all duration-700" style={{ maxHeight: expandedSubjects[subject.id] ? '400px' : '0', opacity: expandedSubjects[subject.id] ? '1' : '0', overflowY: expandedSubjects[subject.id] ? 'auto' : 'hidden', overflowX: 'clip' }}>
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
                                      <div className="transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-files`] ? '3000px' : '0', opacity: expandedSections[`${subject.id}-files`] ? '1' : '0', overflow: expandedSections[`${subject.id}-files`] ? 'visible' : 'hidden' }}>
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
                                      <div className="transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-images`] ? '3000px' : '0', opacity: expandedSections[`${subject.id}-images`] ? '1' : '0', overflow: expandedSections[`${subject.id}-images`] ? 'visible' : 'hidden' }}>
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
                                              <div className="transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? '2000px' : '0', opacity: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? '1' : '0', overflow: expandedSections[`${subject.id}-imageGroup-${groupIdx}`] ? 'visible' : 'hidden', overflowX: 'clip' }}>
  <div className="mt-2 mr-4 space-y-2">
                                                  {group.images.map((image, imgIdx) => (
                                                    <div key={imgIdx} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-green-50'} rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md`}>
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
                                  

                                  {subject.quizzes && subject.quizzes.length > 0 && (
  <div>
    <div
      onClick={() => toggleSection(subject.id, 'quizzes')}
      className={`flex items-center justify-between p-3 ${darkMode ? 'bg-yellow-800 hover:bg-yellow-700' : 'bg-yellow-700 hover:bg-yellow-600'} rounded-lg cursor-pointer transition-all duration-500 transform hover:scale-[1.02]`}
    >
      <h5 className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-100'} flex items-center gap-2`}>
        <ClipboardCheck size={20} className="text-yellow-300" />
        الاختبارات ({subject.quizzes.length})
        {subject.quizzes.some(q => q.isNew && !viewedQuizzes.includes(q.id)) && (
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></span>
        )}
      </h5>
      <ChevronDown size={20} className="transition-all duration-500" style={{ transform: expandedSections[`${subject.id}-quizzes`] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
    </div>
    <div className="transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-quizzes`] ? '3000px' : '0', opacity: expandedSections[`${subject.id}-quizzes`] ? '1' : '0', overflow: expandedSections[`${subject.id}-quizzes`] ? 'visible' : 'hidden' }}>
      <div className="mt-3 space-y-2">
        {subject.quizzes.map((quiz, idx) => (
          <div key={idx} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-yellow-50 hover:bg-yellow-100'} rounded-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-md`}>
            <div className="flex items-center gap-2 flex-1">
              <ClipboardCheck size={20} className="text-yellow-600" />
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <span className="flex items-center gap-1">
                    {quiz.name}
                    {quiz.isNew && !viewedQuizzes.includes(quiz.id) && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        جديد
                      </span>
                    )}
                  </span>
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {quiz.description}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  عدد الأسئلة: {quiz.questions.length}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mr-4">
              <button 
                onClick={() => openQuiz(quiz)} 
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-110 font-medium"
              >
                فتح
              </button>
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
                                      <div className="transition-all duration-700" style={{ maxHeight: expandedSections[`${subject.id}-videos`] ? '3000px' : '0', opacity: expandedSections[`${subject.id}-videos`] ? '1' : '0', overflow: expandedSections[`${subject.id}-videos`] ? 'visible' : 'hidden' }}>
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
      {/* نافذة الاختبار */}
{activeQuiz && (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" style={{ fontFamily: 'Segoe UI, Tahoma, Arial, sans-serif' }}>
    <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-white via-gray-50 to-white'} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* شريط العنوان المحدث */}
<div className={`${darkMode ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'} p-3 sm:p-4 shadow-lg`}>
  <div className="flex justify-between items-start gap-2">
    <div className="flex-1">
      <h3 className="text-base sm:text-xl font-bold text-white mb-1 drop-shadow-lg">
        {activeQuiz.name}
      </h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 text-white/90">
        <span className="flex items-center gap-1 text-xs sm:text-sm">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          السؤال {currentQuestionIndex + 1} من {activeQuiz.questions.length}
        </span>
        <span className="flex items-center gap-1 text-sm">
          📊 تم الإجابة: {Object.keys(userAnswers).length} / {activeQuiz.questions.length}
        </span>
      </div>
      {/* شريط التقدم */}
      <div className="mt-2 bg-white/20 rounded-full h-1.5 sm:h-2 overflow-hidden">
        <div 
          className="bg-white h-full rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${(Object.keys(userAnswers).length / activeQuiz.questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
    
    <div className="flex gap-2">
      {!quizSubmitted && (
        <button
          onClick={() => setShowRestartConfirm(true)}
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-110 flex items-center gap-2 text-sm font-medium whitespace-nowrap"
          title="إعادة الاختبار"
        >
          <span>🔄</span>
          <span className="hidden sm:inline">إعادة</span>
        </button>
      )}
      <button
        onClick={closeQuiz}
        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90"
      >
        <X size={24} />
      </button>
    </div>
  </div>
  {/* نافذة تأكيد إعادة الاختبار */}
{showRestartConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-[60] flex items-center justify-center p-4">
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full shadow-2xl`}>
      <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        ⚠️ تأكيد إعادة الاختبار
      </h3>
      <p className={`mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        هل أنت متأكد من أنك تريد إعادة الاختبار؟ سيتم حذف جميع إجاباتك الحالية.
      </p>
      <div className="flex gap-3">
        <button
          onClick={confirmRestartQuiz}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
        >
          إعادة
        </button>
        <button
          onClick={() => setShowRestartConfirm(false)}
          className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
)}

{/* نافذة تأكيد حذف السجل */}
{showDeleteHistoryConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-[60] flex items-center justify-center p-4">
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full shadow-2xl`}>
      <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        🗑️ تأكيد حذف السجل
      </h3>
      <p className={`mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        هل أنت متأكد من أنك تريد حذف سجل جميع محاولاتك السابقة لهذا الاختبار؟ هذا الإجراء لا يمكن التراجع عنه.
      </p>
      <div className="flex gap-3">
        <button
          onClick={deleteQuizHistory}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
        >
          حذف
        </button>
        <button
          onClick={() => setShowDeleteHistoryConfirm(false)}
          className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
)}
</div>
      
      <div className="p-3 sm:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
        {activeQuiz.questions[currentQuestionIndex] && (
          <div className="space-y-6">
            {/* السؤال */}
            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg ${darkMode ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200'}`}>
              <div className="flex items-start gap-2">
                <span className={`flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${darkMode ? 'bg-indigo-600 text-white' : 'bg-blue-600 text-white'} shadow-lg`}>
                  {currentQuestionIndex + 1}
                </span>
                <p className={`text-sm sm:text-lg font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {activeQuiz.questions[currentQuestionIndex].question}
                </p>
              </div>
            </div>
            
            {/* الخيارات */}
            <div className="space-y-2">
              {activeQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                const questionId = activeQuiz.questions[currentQuestionIndex].id;
                const isSelected = userAnswers[questionId] === idx;
                const isCorrect = idx === activeQuiz.questions[currentQuestionIndex].correctAnswer;
                const hasAnswered = userAnswers[questionId] !== undefined;
                
                let buttonClass = `w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-right transition-all duration-300 transform hover:scale-[1.02] border-2 ${
                  darkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 text-gray-200' 
                    : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-900'
                } shadow-md hover:shadow-xl`;
                
                if (hasAnswered) {
                  if (isSelected && isCorrect) {
                    buttonClass = 'w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-right bg-gradient-to-r from-green-500 to-emerald-500 text-white border-2 border-green-600 shadow-xl transform scale-[1.02]';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-right bg-gradient-to-r from-red-500 to-pink-500 text-white border-2 border-red-600 shadow-xl';
                  } else if (!isSelected && isCorrect) {
                    buttonClass = 'w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-right bg-gradient-to-r from-green-400 to-emerald-400 text-white border-2 border-green-500 shadow-lg';
                  } else {
                    buttonClass = `w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-right border-2 opacity-60 ${
                      darkMode 
                        ? 'bg-gray-800/30 border-gray-700 text-gray-400' 
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }`;
                  }
                }
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(questionId, idx, activeQuiz.questions[currentQuestionIndex].correctAnswer)}
                    className={buttonClass}
                    disabled={hasAnswered || quizSubmitted}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className={`flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                        hasAnswered
                          ? isSelected
                            ? 'bg-white/30 text-white'
                            : isCorrect
                            ? 'bg-white/30 text-white'
                            : 'bg-gray-500/30 text-gray-300'
                          : darkMode
                          ? 'bg-indigo-600/50 text-white'
                          : 'bg-blue-100 text-blue-700'
                      } shadow-md`}>
                        {['أ', 'ب', 'ج', 'د'][idx]}
                      </span>
                      <span className={`flex-1 text-sm sm:text-base font-medium ${
                        hasAnswered && !isSelected && !isCorrect
                          ? 'line-through'
                          : ''
                      }`}>
                        {option}
                      </span>
                      {hasAnswered && (
                        <span className="flex-shrink-0">
                          {isSelected && isCorrect && '✓'}
                          {isSelected && !isCorrect && '✗'}
                          {!isSelected && isCorrect && '✓'}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* رسالة التغذية الراجعة الفورية */}
            {!quizSubmitted && showResults[activeQuiz.questions[currentQuestionIndex].id] !== undefined && (
              <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border-2 ${
                showResults[activeQuiz.questions[currentQuestionIndex].id] 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400' 
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-400'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl sm:text-3xl ${
                    showResults[activeQuiz.questions[currentQuestionIndex].id] 
                      ? '🎉' 
                      : '😔'
                  }`}></span>
                  <div>
                    <p className={`font-bold text-sm sm:text-base ${
                      showResults[activeQuiz.questions[currentQuestionIndex].id]
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
                      {showResults[activeQuiz.questions[currentQuestionIndex].id] 
                        ? 'ممتاز! إجابة صحيحة' 
                        : 'إجابة خاطئة'}
                    </p>
                    {!showResults[activeQuiz.questions[currentQuestionIndex].id] && (
                      <p className="text-xs sm:text-sm text-gray-700 mt-1 font-medium">
                        الإجابة الصحيحة: {activeQuiz.questions[currentQuestionIndex].options[activeQuiz.questions[currentQuestionIndex].correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* أزرار التنقل أو النتيجة النهائية */}
        {!quizSubmitted ? (
          <div className={`flex justify-between items-center gap-3 mt-8 pt-6 border-t-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
  <button
    onClick={previousQuestion}
    disabled={currentQuestionIndex === 0}
    className={`px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-110 flex items-center gap-2 ${
      currentQuestionIndex === 0
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : darkMode
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
        : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg'
    }`}
  >
    <span>→</span>
    <span className="hidden sm:inline">السؤال السابق</span>
    <span className="sm:hidden">السابق</span>
  </button>
  
  {currentQuestionIndex === activeQuiz.questions.length - 1 ? (
    <button
      onClick={submitQuiz}
      disabled={Object.keys(userAnswers).length !== activeQuiz.questions.length}
      className={`px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-110 flex items-center gap-2 shadow-lg ${
        Object.keys(userAnswers).length !== activeQuiz.questions.length
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white animate-pulse'
      }`}
    >
      <span>✓</span>
      {/* قائمة الأسئلة غير المُجابة */}
{currentQuestionIndex === activeQuiz.questions.length - 1 && 
 Object.keys(userAnswers).length !== activeQuiz.questions.length && (
  <div className={`mb-6 p-4 rounded-xl border-2 ${
    darkMode 
      ? 'bg-red-900/30 border-red-700' 
      : 'bg-red-50 border-red-300'
  }`}>
    <p className="font-bold mb-3 flex items-center gap-2 text-red-600">
      <span>⚠️</span>
      <span>يوجد أسئلة لم تجب عنها:</span>
    </p>
    <div className="flex flex-wrap gap-2">
      {activeQuiz.questions.map((q, idx) => {
        if (userAnswers[q.id] === undefined) {
          return (
            <button
              key={idx}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`px-3 py-1.5 text-sm rounded-lg font-bold transition-all duration-300 transform hover:scale-110 ${
                darkMode
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              } shadow-md`}
            >
              السؤال {idx + 1}
            </button>
          );
        }
        return null;
      })}
    </div>
  </div>
)}
      <span className="hidden sm:inline">تسليم الاختبار</span>
      <span className="sm:hidden">تسليم</span>
    </button>
  ) : (
    <button
      onClick={nextQuestion}
      className={`px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-110 flex items-center gap-2 shadow-lg ${
        darkMode
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
          : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
      }`}
    >
      <span className="hidden sm:inline">السؤال التالي</span>
      <span className="sm:hidden">التالي</span>
      <span>←</span>
    </button>
  )}
</div>
        ) : (
          <div className="mt-8 pt-6">
            <div className={`text-center p-10 rounded-2xl shadow-2xl ${
              getQuizScore().percentage >= 50 
                ? 'bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 border-4 border-green-500' 
                : 'bg-gradient-to-br from-red-100 via-pink-50 to-red-100 border-4 border-red-500'
            }`}>
              <div className="mb-6">
                <span className="text-7xl animate-bounce inline-block">
                  {getQuizScore().percentage >= 90 ? '🏆' : getQuizScore().percentage >= 50 ? '🎉' : '😔'}
                </span>
              </div>
              
              <h3 className={`text-4xl font-bold mb-6 ${
                getQuizScore().percentage >= 50 ? 'text-green-700' : 'text-red-700'
              }`}>
                {getQuizScore().percentage >= 90 
                  ? 'ممتاز جدًا!' 
                  : getQuizScore().percentage >= 50 
                  ? 'أحسنت!' 
                  : 'حاول مرة أخرى'}
              </h3>
              
              <div className="mb-8">
  <p className="text-gray-700 text-lg sm:text-xl mb-4 font-semibold">نتيجتك النهائية:</p>
  <div className={`inline-block px-6 sm:px-12 py-4 sm:py-6 rounded-2xl ${
    getQuizScore().percentage >= 50 ? 'bg-green-500' : 'bg-red-500'
  } shadow-2xl transform hover:scale-110 transition-all duration-300`}>
    <p className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white">
      {getQuizScore().percentage}%
    </p>
  </div>
</div>

<div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 max-w-2xl mx-auto">
  <div className={`p-3 sm:p-4 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-white/50'} shadow-lg flex flex-col justify-between h-24 sm:h-28`}>
    <p className="text-xs sm:text-sm text-gray-600">الإجابات الصحيحة</p>
    <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-auto">{getQuizScore().correct}</p>
  </div>
  <div className={`p-3 sm:p-4 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-white/50'} shadow-lg flex flex-col justify-between h-24 sm:h-28`}>
    <p className="text-xs sm:text-sm text-gray-600">الإجابات الخاطئة</p>
    <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-auto">{getQuizScore().total - getQuizScore().correct}</p>
  </div>
  <div className={`p-3 sm:p-4 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-white/50'} shadow-lg flex flex-col justify-between h-24 sm:h-28`}>
    <p className="text-xs sm:text-sm text-gray-600">المجموع</p>
    <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-auto">{getQuizScore().total}</p>
  </div>
</div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
  <button
    onClick={() => setShowRestartConfirm(true)}
    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center gap-3"
  >
    <span>🔄</span>
    <span>إعادة الاختبار</span>
  </button>
  
  {quizHistory[activeQuiz.id] && quizHistory[activeQuiz.id].length > 1 && (
    <button
      onClick={() => setShowHistory(!showHistory)}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center gap-3"
    >
      <span>📊</span>
      <span>عرض السجل ({quizHistory[activeQuiz.id].length})</span>
    </button>
  )}
</div>

{/* عرض سجل المحاولات السابقة */}
{showHistory && quizHistory[activeQuiz.id] && (
  <div className={`mt-6 p-6 rounded-xl ${
    darkMode ? 'bg-gray-800' : 'bg-white'
  } shadow-lg`}>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
  <h4 className={`text-lg sm:text-xl font-bold ${
    darkMode ? 'text-white' : 'text-gray-900'
  }`}>
    📊 سجل المحاولات
  </h4>
  <button
    onClick={() => setShowDeleteHistoryConfirm(true)}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-all duration-300 transform hover:scale-110 flex items-center gap-1.5 font-medium text-xs sm:text-sm whitespace-nowrap"
  >
    <span>🗑️</span>
    <span>حذف</span>
  </button>
</div>
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {quizHistory[activeQuiz.id].map((attempt, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-lg border-2 ${
            idx === quizHistory[activeQuiz.id].length - 1
              ? darkMode
                ? 'bg-indigo-900/50 border-indigo-500'
                : 'bg-blue-50 border-blue-500'
              : darkMode
              ? 'bg-gray-700 border-gray-600'
              : 'bg-gray-50 border-gray-300'
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center gap-3">
              <span className={`text-2xl ${
                idx === quizHistory[activeQuiz.id].length - 1 ? '🎯' : '📝'
              }`}></span>
              <div>
                <p className={`font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  المحاولة {idx + 1}
                  {idx === quizHistory[activeQuiz.id].length - 1 && (
                    <span className="mr-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                      الحالية
                    </span>
                  )}
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {attempt.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg ${
                attempt.percentage >= 50
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } text-white font-bold`}>
                {attempt.percentage}%
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="text-green-600 font-bold">{attempt.correct}</span>
                {' / '}
                <span className="font-bold">{attempt.total}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* إحصائيات إضافية */}
    <div className={`mt-4 pt-4 border-t-2 ${
      darkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
  <div className={`p-3 rounded-lg text-center flex flex-col ${
    darkMode ? 'bg-gray-700' : 'bg-gray-100'
  }`}>
    <p className={`text-xs mb-2 ${
      darkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>عدد المحاولات</p>
    <p className={`text-xl font-bold mt-auto ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {quizHistory[activeQuiz.id].length}
    </p>
  </div>
  <div className={`p-3 rounded-lg text-center flex flex-col ${
    darkMode ? 'bg-gray-700' : 'bg-gray-100'
  }`}>
    <p className={`text-xs mb-2 ${
      darkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>أعلى نسبة</p>
    <p className="text-xl font-bold text-green-600 mt-auto">
      {Math.max(...quizHistory[activeQuiz.id].map(a => parseFloat(a.percentage)))}%
    </p>
  </div>
  <div className={`p-3 rounded-lg text-center flex flex-col ${
    darkMode ? 'bg-gray-700' : 'bg-gray-100'
  }`}>
    <p className={`text-xs mb-2 ${
      darkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>أقل نسبة</p>
    <p className="text-xl font-bold text-red-600 mt-auto">
      {Math.min(...quizHistory[activeQuiz.id].map(a => parseFloat(a.percentage)))}%
    </p>
  </div>
  <div className={`p-3 rounded-lg text-center flex flex-col ${
    darkMode ? 'bg-gray-700' : 'bg-gray-100'
  }`}>
    <p className={`text-xs mb-2 translate-y-1 ${
      darkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>المتوسط</p>
    <p className={`text-xl font-bold mt-auto ${
      darkMode ? 'text-blue-400' : 'text-blue-600'
    }`}>
      {(quizHistory[activeQuiz.id].reduce((sum, a) => sum + parseFloat(a.percentage), 0) / quizHistory[activeQuiz.id].length).toFixed(1)}%
    </p>
  </div>
</div>
    </div>
  </div>
)}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}
      <footer className="bg-gray-800 text-white mt-1 py-8">
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
          <p className="text-xs text-gray-400 mt-2">جميع الحقوق محفوظة © 2026</p>
        </div>
      </footer>
    </div>
  );
}