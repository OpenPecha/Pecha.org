import React, { useState, useEffect } from 'react';
import classNames  from 'classnames';
import Sefaria  from './sefaria/sefaria';
import {AppStoreButton, DonateLink, EnglishText, HebrewText, ImageWithCaption} from './Misc'
import {NewsletterSignUpForm} from "./NewsletterSignUpForm";
import {InterfaceText, ProfileListing, Dropdown} from './Misc';
import { Promotions } from './Promotions'
import {SignUpModalKind} from "./sefaria/signupModalContent";

const NavSidebar = ({modules}) => {
  return <div className="navSidebar sans-serif">
    {modules.map((m, i) =>
      <Modules
        type={m.type}
        props={m.props || {}}
        key={i} />
    )}
  </div>
};


const Modules = ({type, props}) => {
  // Choose the appropriate module component to render by `type`
  const moduleTypes = {
    "AboutSefaria":           AboutSefaria,
    "Promo":                  Promo,
    "Resources":              Resources,
    "TheJewishLibrary":       TheJewishLibrary,
    "AboutTextCategory":      AboutTextCategory,
    "AboutText":              AboutText,
    "SupportSefaria":         SupportSefaria,
    "SponsorADay":            SponsorADay,
    "LearningSchedules":      LearningSchedules,
    "Translations":           Translations,
    "WeeklyTorahPortion":     WeeklyTorahPortion,
    "DafYomi":                DafYomi,
    "AboutTopics":            AboutTopics,
    "TrendingTopics":         TrendingTopics,
    "RelatedTopics":          RelatedTopics,
    "TitledText":             TitledText,
    "Visualizations":         Visualizations,
    "JoinTheConversation":    JoinTheConversation,
    "JoinTheCommunity":       JoinTheCommunity,
    "GetTheApp":              GetTheApp,
    "StayConnected":          StayConnected,
    "AboutLearningSchedules": AboutLearningSchedules,
    "AboutTranslatedText":    AboutTranslatedText,
    "AboutCollections":       AboutCollections,
    "ExploreCollections":     ExploreCollections,
    "DownloadVersions":       DownloadVersions,
    "WhoToFollow":            WhoToFollow,
    "Image":                  Image,
    "Wrapper":                Wrapper,
    "PortalAbout":            PortalAbout,
    "PortalMobile":           PortalMobile,
    "PortalOrganization":     PortalOrganization,
    "PortalNewsletter":       PortalNewsletter,
    "RecentlyViewed":        RecentlyViewed,
  };
  if (!type) { return null; }
  const ModuleType = moduleTypes[type];
  return <ModuleType {...props} />
};


const Module = ({children, blue, wide}) => {
  const classes = classNames({navSidebarModule: 1, "sans-serif": 1, blue, wide});
  return <div className={classes}>{children}</div>
};


const ModuleTitle = ({children, en, he, h1}) => {
  const content = children ?
    <InterfaceText>{children}</InterfaceText>
    : <InterfaceText text={{en, he}} />;

  return h1 ?
    <h1>{content}</h1>
    : <h3>{content}</h3>
};


const TitledText = ({enTitle, heTitle, enText, heText}) => {
  return <Module>
    <ModuleTitle en={enTitle} he={heTitle} />
    <InterfaceText markdown={{en: enText, he: heText}} />
  </Module>
};

const RecentlyViewedItem = ({oref}) => {
   const trackItem = () => {
     gtag('event', 'recently_viewed', {link_text: oref.ref, link_type: 'ref'})
   }
   return <li>
            <a href={oref.ref} onClick={() => trackItem()}>{Sefaria._v({"he": oref.he_ref, "en": oref.ref})}</a>
         </li>;
}
const RecentlyViewedList = ({items}) => {
   const recentlyViewedListItems = items.map(x => { return <RecentlyViewedItem oref={x} key={`RecentlyViewedItem${x.ref}`}/>});
   return <div className={"navSidebarLink serif recentlyViewed"}><ul>{recentlyViewedListItems}</ul></div>;
}
const RecentlyViewed = ({toggleSignUpModal, mobile}) => {
   const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
   const handleAllHistory = (e) => {
    if (!Sefaria._uid) {
      e.preventDefault();
      toggleSignUpModal(SignUpModalKind.ViewHistory);
    }
    gtag('event', 'recently_viewed', {link_type: 'all_history', logged_in: !!Sefaria._uid});
   }

   const filterRecentlyViewedItems = () => {
        let itemsToShow = [];
        let booksFound = [];
        Sefaria.userHistory.items.forEach(x => {
        if (!booksFound.includes(x.book) && x.book !== "Sheet") {
           booksFound.push(x.book);
           itemsToShow.push(x);
        }});

        itemsToShow = itemsToShow.slice(0, 3);
        setRecentlyViewedItems(itemsToShow);
   }

   useEffect( () => {
       if (!Sefaria.userHistory.loaded) {
           Sefaria.loadUserHistory(20, filterRecentlyViewedItems);
       } else {
           filterRecentlyViewedItems();
       }
   }, []);

   if (!Sefaria.userHistory.items || Sefaria.userHistory.items.length === 0) {
     return null;
   }
   const allHistoryPhrase = mobile ? "All History" : "All history ";
   const recentlyViewedList = <RecentlyViewedList items={recentlyViewedItems}/>;
   return <Module>
            <div className="recentlyViewed">
                <div id="header">
                  <ModuleTitle h1={true}>Recently Viewed</ModuleTitle>
                  {!mobile && recentlyViewedList}
                  <a href="/texts/history" id="history" onClick={handleAllHistory}><InterfaceText>{allHistoryPhrase}</InterfaceText></a>
                </div>
                {mobile && recentlyViewedList}
            </div>
          </Module>;
}

const Promo = () =>
    <Module>
        <Promotions adType="sidebar"/>
    </Module>
;

const AboutSefaria = ({hideTitle}) => (
  <Module>
    {!hideTitle ?
    <ModuleTitle h1={true}>A Living Library of Buddhist Text</ModuleTitle> : null }
    <InterfaceText>
      <EnglishText>
          Pecha is home to 2500 years of Buddhist texts. We are offering free access to texts, translations,
          and commentaries so that everyone can participate in the ongoing process of studying, interpreting,
           and creating Buddhist text library.
        </EnglishText>
        <HebrewText>
          དཔེ་ཆ་དྲ་ཚིགས་ནི་ལོ་ངོ་ཉིས་སྟོང་ལྔ་བརྒྱ་ལྷག་གི་ལོ་རྒྱུས་ལྡན་པའི་ནང་བསྟན་གསུང་རབ་རྣམས་ཀྱི་མཛོད་ཁང་ལྟ་བུ་ཞིག་ཡིན། ང་ཚོས་ཆ་རྐྱེན་གང་ཡང་མི་དགོས་པར་ནང་པའི་གསུང་རབ་ཁག་དང་འགྱུར་མ། གཞུང་འགྲེལ་བཅས་ལ་ཐུན་མོང་གིས་མཇལ་ཐུབ་པའི་གོ་སྐབས་སྤྲོད་ཀྱི་ཡོད། 
          བྱེད་ཐབས་འདི་བརྒྱུད་ནས་སྐྱེས་བུ་སུ་ཞིག་ཡིན་རུང་ནང་བསྟན་གསུང་རབ་ལ་སློབ་གཉེར་དང་གཞུང་འགྲེལ་བྱེད་པ། ནང་བསྟན་གྱི་དཔེ་ཚོགས་ཀུན་འཛོམས་ཀྱི་དཔེ་མཛོད་འདི་ཇེ་ལེགས་ཇེ་རྒྱས་སུ་གཏོང་བའི་ལས་རིམ་ལ་ཞུགས་ཐུབ་ཀྱི་ཡོད།
        </HebrewText>
    </InterfaceText>
    }
  </Module>
);


const AboutTranslatedText = ({translationsSlug}) => {

  const translationLookup = {
    "ar": {title: "نصوص يهودية بالعربية", body: "سفاريا هي موطن 3000 سنة من النصوص اليهودية. نحن منظمة غير ربحية تقدم وصولاً مجانيًا إلى النصوص والترجمات والتعليقات حتى يتمكن الجميع من المشاركة في العملية المستمرة لدراسة التوراة وتفسيرها وخلقها."},
    "de": {title: "Eine lebendige Bibliothek der Tora", body: "Sefaria ist eine Bibliothek für jüdische Texte aus 3.000 Jahren. Wir sind eine gemeinnützige Organisation, die freien Zugang zu Texten, Übersetzungen und Kommentaren bietet, damit jede und jeder am fortlaufenden Prozess des Studierens, Interpretierens und der Entwicklung der Tora teilnehmen kann."},
    "eo": {title: "Vivanta Biblioteko de Torao", body: "Sefaria estas hejmo de 3,000 jaroj da judaj tekstoj. Ni estas neprofitcela organizo ofertanta senpagan aliron al tekstoj, tradukoj kaj komentaĵoj por ke ĉiuj povu partopreni en la daŭra procezo de studado, interpretado kaj kreado de Torao."},
    "es": {title: "Una biblioteca viva de la Torá", body: "Sefaria alberga 3.000 años de textos judíos. Somos una organización sin fines de lucro que ofrece acceso gratuito a textos, traducciones y comentarios para que todos puedan participar en el proceso continuo de estudio, interpretación y creación de la Torá."},
    "fa": {title:"کتابخانه زنده تورات", body: "سفاریا خانه 3000 سال متون یهودی است. ما یک سازمان غیرانتفاعی هستیم که دسترسی رایگان به متون، ترجمه ها و تفسیرها را ارائه می دهیم تا همه بتوانند در روند مداوم مطالعه، تفسیر و ایجاد تورات شرکت کنند."},
    "fi": {title: "Tooran elävä kirjasto", body: "Sefaria on koti 3000 vuoden juutalaisille teksteille. Olemme voittoa tavoittelematon organisaatio, joka tarjoaa ilmaisen pääsyn teksteihin, käännöksiin ja kommentteihin, jotta kaikki voivat osallistua jatkuvaan Tooran opiskelu-, tulkkaus- ja luomisprosessiin."},
    "fr": {title: "Une bibliothèque vivante de la Torah", body: "Une bibliothèque de Torah vivante. Sefaria abrite 3 000 ans de textes juifs. Nous sommes une organisation à but non lucratif offrant un accès gratuit aux textes de la Torah, aux commentaires et aux traductions, afin que chacun puisse participer au processus infini de l'étude, de l'interprétation et de la création de la Torah."},
    "it": {title: "Una biblioteca vivente della Torah", body: "Sefaria ospita 3.000 anni di testi ebraici. Siamo un'organizzazione senza scopo di lucro che offre libero accesso a testi, traduzioni e commenti in modo che tutti possano partecipare al processo in corso di studio, interpretazione e creazione della Torah."},
    "pl": {title: "Żywa Biblioteka Tory", body: "Sefaria jest domem dla 3000 lat żydowskich tekstów. Jesteśmy organizacją nonprofit oferującą bezpłatny dostęp do tekstów, tłumaczeń i komentarzy, dzięki czemu każdy może uczestniczyć w bieżącym procesie studiowania, tłumaczenia i tworzenia Tory."},
    "pt": {title: "Uma Biblioteca Viva da Torá", body: "Sefaria é o lar de 3.000 anos de textos judaicos. Somos uma organização sem fins lucrativos que oferece acesso gratuito a textos, traduções e comentários para que todos possam participar do processo contínuo de estudo, interpretação e criação da Torá."},
    "ru": {title: "Живая библиотека Торы", body: "Сефария является домом для еврейских текстов 3000-летней давности. Мы — некоммерческая организация, предлагающая бесплатный доступ к текстам, переводам и комментариям, чтобы каждый мог участвовать в продолжающемся процессе изучения, толкования и создания Торы."},
    "yi": {title: "א לעבעדיקע ביבליאטעק פון תורה", body: "אין ספֿריאַ איז אַ היים פֿון 3,000 יאָר ייִדישע טעקסטן. מיר זענען אַ נאַן-נוץ אָרגאַניזאַציע וואָס אָפפערס פריי אַקסעס צו טעקסטן, איבערזעצונגען און קאָמענטאַרן אַזוי אַז אַלעמען קענען אָנטייל נעמען אין די אָנגאָינג פּראָצעס פון לערנען, ינטערפּריטיישאַן און שאפן תורה."}
  }
  return (
  <Module>
    <ModuleTitle h1={true}>{translationLookup[translationsSlug] ?
          translationLookup[translationsSlug]["title"] : "A Living Library of Buddhist Text"}</ModuleTitle>
        { translationLookup[translationsSlug] ?
          translationLookup[translationsSlug]["body"] :
          <InterfaceText>
          <EnglishText>
          Sefaria is home to 3,000 years of Jewish texts. We are a nonprofit organization offering free access to texts, translations,
          and commentaries so that everyone can participate in the ongoing process of studying, interpreting, and creating Torah.
        </EnglishText>
        <HebrewText>
          ספריא היא ביתם של 3,000 שנות ספרות יהודית.
          אנו ארגון ללא מטרות רווח המציע גישה חופשית למקורות יהודיים, לתרגומים ולפרשנויות,
          ומטרתנו לאפשר לכל אחד ואחת להשתתף בתהליך המתמשך של לימוד וחידוש בתורה.
        </HebrewText>
        </InterfaceText>
        }
  </Module>
);
}


const Resources = () => (
  <Module>
    <h3><InterfaceText context="ResourcesModule">Resources</InterfaceText></h3>
    <div className="linkList">
      <IconLink text="Mobile Apps" url="/mobile" icon="mobile.svg" />
      <IconLink text="Create with Sefaria" url="/sheets" icon="sheet.svg" />
      <IconLink text="Collections" url="/collections" icon="collection.svg" />
      <IconLink text="Teach with Sefaria" url="/educators" icon="educators.svg" />
      <IconLink text="Visualizations" url="/visualizations" icon="visualizations.svg" />
      <IconLink text="Torah Tab" url="/torah-tab" icon="torah-tab.svg" />
      <IconLink text="Help" url="/help" icon="help.svg" />
    </div>
  </Module>
);


const TheJewishLibrary = ({hideTitle}) => (
  <Module>
    {!hideTitle ?
    <ModuleTitle>The Jewish Library</ModuleTitle> : null}
    <InterfaceText>The tradition of Torah texts is a vast, interconnected network that forms a conversation across space and time. The five books of the Torah form its foundation, and each generation of later texts functions as a commentary on those that came before it.</InterfaceText>
  </Module>
);


const SupportSefaria = ({white}) => (
  <Module blue={white}>{/*
    <ModuleTitle>Support Sefaria</ModuleTitle>
    <InterfaceText>Sefaria is an open source, nonprofit project. Support us by making a tax-deductible donation.</InterfaceText>
    <br />
    <DonateLink classes={"button small" + (blue ? " white" : "")} source={"NavSidebar-SupportSefaria"}>
      <img src="/static/img/heart.png" alt="donation icon" />
      <InterfaceText>Make a Donation</InterfaceText>
    </DonateLink>*/}
  </Module>
);


const SponsorADay = () => (
  <Module>
    <ModuleTitle>Sponsor A Day of Learning</ModuleTitle>
    <InterfaceText>With your help, we can add more texts and translations to the library, develop new tools for learning, and keep Sefaria accessible for Torah study anytime, anywhere.</InterfaceText>
    <br />
    <DonateLink classes={"button small"} link={"dayOfLearning"} source={"NavSidebar-SponsorADay"}>
      <img src="/static/img/heart.png" alt="donation icon" />
      <InterfaceText>Sponsor A Day</InterfaceText>
    </DonateLink>
  </Module>
);


const AboutTextCategory = ({cats}) => {
  const tocObject = Sefaria.tocObjectByCategories(cats);
  const enTitle = "About " + tocObject.category;
  const heTitle = "སྐོར། " + tocObject.heCategory;

  if ((Sefaria.interfaceLang === "hebrew" && !tocObject.heDesc) ||
      (Sefaria.interfaceLang === "english" && !tocObject.enDesc)) {
    return null;
  }

  return (
    <Module>
      <h3><InterfaceText text={{en: enTitle, he: heTitle}} /></h3>
      <InterfaceText markdown={{en: tocObject.enDesc, he: tocObject.heDesc}} />
    </Module>
  );
};


const AboutText = ({index, hideTitle}) => {
  const lang = Sefaria.interfaceLang === "hebrew" ? "he" : "en"

  let composed = [index.compPlaceString?.[lang], index.compDateString?.[lang]].filter(x=>!!x).join(", ");
  composed = composed.replace(/[()]/g, "");

  if (index.categories.length == 2 && index.categories[0] == "Tanakh" && ["Torah", "Prophets", "Writings"].indexOf(index.categories[1]) !== -1) {
    // Don't show date/time for Tanakh.
    composed = null;
  }

  let authors   = index?.authors || [];
  authors = authors.filter(a => !!a[lang]).map(a => <a href={"/topics/" + a.slug} key={a.slug}><InterfaceText>{a[lang]}</InterfaceText></a>);
  authors = [].concat(...authors.map(x => [<span>, </span>, x])).slice(1); // Like a join for an array of React elements
  const heDesc = index.heDesc || index.heShortDesc;
  const enDesc = index.enDesc || index.enShortDesc;
  const description = lang === "he" ? heDesc : enDesc;

  if (!authors.length && !composed && !description) { return null; }

  return (
    <Module>
      {hideTitle ? null :
          <ModuleTitle>About This Text</ModuleTitle>}
      { composed || authors.length ?
      <div className="aboutTextMetadata">

        {authors.length ?
        <div className="aboutTextAuthor">
          {authors.length == 1 ?
              <span><InterfaceText>Author</InterfaceText>:</span>
          : <span><InterfaceText>Authors</InterfaceText>:</span>}
          <span className="aboutTextAuthorText">
            &nbsp;{authors}
          </span>
        </div> : null}

        {composed ?
        <div className="aboutTextComposed">
          <InterfaceText>Composed</InterfaceText>:
          <span className="aboutTextComposedText">
            &nbsp;<InterfaceText>{composed}</InterfaceText>
          </span>
        </div> : null}

      </div> : null}
      {description ?
      <InterfaceText markdown={{en: enDesc, he: heDesc}}/> : null}

    </Module>
  );
};


const TranslationLinks = () => {
  return (
    <div className="navSidebarLink serif language">
      {<ul>{Object.keys(Sefaria.ISOMap).map(key => Sefaria.ISOMap[key]["showTranslations"] ? <li key={key}><a href={`/translations/${key}`}>
          {Sefaria.ISOMap[key]["nativeName"]}
          </a></li> : null)} </ul>}
      </div>
  );
};


const ParashahLink = () => {
  const parashah = Sefaria.calendars.filter(c => c.title.en === "Parashat Hashavua")[0];
  return (
    <div className="navSidebarLink ref serif">
      <img src="/static/icons/book.svg" className="navSidebarIcon" alt="book icon" />
      <a href={"/" + parashah.url}><InterfaceText text={{en: parashah.ref, he: parashah.heRef}} /></a>
    </div>
  );
};


const ParashahName = () => {
  const parashah = Sefaria.calendars.filter(c => c.title.en === "Parashat Hashavua")[0];
  return <InterfaceText text={parashah.displayValue} />
};


const HaftarotLinks = () => {
  const haftarot = Sefaria.calendars.filter(c => c.title.en.startsWith("Haftarah"))
  return (
    <>
      {haftarot.map(h =>
      <div className="navSidebarLink ref serif" key={h.url}>
        <img src="/static/icons/book.svg" className="navSidebarIcon" alt="book icon" />
        <a href={"/" + h.url}><InterfaceText text={h.displayValue} /></a>
      </div>)}
    </>
  );
};


const DafLink = () => {
  const daf = Sefaria.calendars.filter(c => c.title.en === "Daf Yomi")[0];
  return (
    <div className="navSidebarLink ref serif">
      <img src="/static/icons/book.svg" className="navSidebarIcon" alt={Sefaria._("book icon")} />
      <a href={"/" + daf.url}>
        <InterfaceText text={daf.displayValue} />
      </a>
    </div>
  );
}

const Translations = () => {
  return (<Module>
    <ModuleTitle>Translations</ModuleTitle>
    <InterfaceText>
      <EnglishText>
        Access key works from the library in several languages.
      </EnglishText>
      <HebrewText>
        יצירות נבחרות מהספרייה בתרגומים לשפות שונות.
      </HebrewText>
    </InterfaceText>
    <TranslationLinks />
  </Module>)
}


const LearningSchedules = () => {
  return (
    <Module>
      <ModuleTitle>Learning Schedules</ModuleTitle>
      <div className="readingsSection">
        <span className="readingsSectionTitle">
          <InterfaceText>Weekly Torah Portion</InterfaceText>: <ParashahName />
        </span>
        <ParashahLink />
      </div>
      <div className="readingsSection">
        <span className="readingsSectionTitle">
          <InterfaceText >Haftarah</InterfaceText>
        </span>
        <HaftarotLinks />
      </div>
      <div className="readingsSection">
        <span className="readingsSectionTitle">
          <InterfaceText >Daf Yomi</InterfaceText>
        </span>
        <DafLink />
      </div>
      <a href="/calendars" className="allLink">
        <InterfaceText>
        <EnglishText>All Learning Schedules ›</EnglishText>
        <HebrewText>לוחות לימוד נוספים ›</HebrewText>
        </InterfaceText>
      </a>
    </Module>
  );
};


const WeeklyTorahPortion = () => {
  return (
    <Module>
      <ModuleTitle>Weekly Torah Portion</ModuleTitle>
      <div className="readingsSection">
        <span className="readingsSectionTitle">
          <ParashahName />
        </span>
        <ParashahLink />
      </div>
      <div className="readingsSection">
        <span className="readingsSectionTitle">
          <InterfaceText >Haftarah</InterfaceText>
        </span>
        <HaftarotLinks />
      </div>
      <a href="/topics/category/torah-portions" className="allLink">
        <InterfaceText>
        <EnglishText>All Portions ›</EnglishText>
        <HebrewText>פרשות השבוע ›</HebrewText>
        </InterfaceText>
      </a>
    </Module>
  );
};


const DafYomi = () => {
  return (
    <Module>
      <ModuleTitle>Daily Learning</ModuleTitle>
      <div className="readingsSection">
        <span className="readingsSectionTitle">
          <InterfaceText >Daf Yomi</InterfaceText>
        </span>
        <DafLink />
      </div>
    </Module>
  );
};


const Visualizations = ({categories}) => {
  const visualizations = [
    {en: "Tanakh & Talmud",
      he: 'תנ"ך ותלמוד',
      url: "/explore"},
    {en: "Talmud & Mishneh Torah",
      he: "תלמוד ומשנה תורה",
      url: "/explore-Bavli-and-Mishneh-Torah"},
    {en: "Talmud & Shulchan Arukh",
      he: "תלמוד ושולחן ערוך",
      url: "/explore-Bavli-and-Shulchan-Arukh"},
    {en: "Mishneh Torah & Shulchan Arukh",
      he: "משנה תורה ושולחן ערוך",
      url: "/explore-Mishneh-Torah-and-Shulchan-Arukh"},
    {en: "Tanakh & Midrash Rabbah",
      he: 'תנ"ך ומדרש רבה',
      url: "/explore-Tanakh-and-Midrash-Rabbah"},
    {en: "Tanakh & Mishneh Torah",
      he: 'תנ"ך ומשנה תורה',
      url: "/explore-Tanakh-and-Mishneh-Torah"},
    {en: "Tanakh & Shulchan Arukh",
      he: 'תנ"ך ושולחן ערוך',
      url: "/explore-Tanakh-and-Shulchan-Arukh"},
  ];

  const links = visualizations.filter(v => categories.some(cat => v.en.indexOf(cat) > -1));

  if (links.length == 0) { return null; }

  return (
    <Module>
      <ModuleTitle>Visualizations</ModuleTitle>
      <InterfaceText>Explore interconnections among texts with our interactive visualizations.</InterfaceText>
      <div className="linkList">
        {links.map((link, i) =>
          <div className="navSidebarLink gray" key={i}>
            <img src="/static/icons/visualization.svg" className="navSidebarIcon" alt={Sefaria._("visualization icon")} />
            <a href={link.url}><InterfaceText text={{en: link.en, he: link.he}} /></a>
          </div>
        )}
      </div>
      <a href="/visualizations" className="allLink">
        <InterfaceText>
        <EnglishText>All Visualizations ›</EnglishText>
        <HebrewText>תרשימים גרפיים נוספים ›</HebrewText>
        </InterfaceText>
      </a>
    </Module>
  );
};


const AboutTopics = ({hideTitle}) => (
  <Module>
    {hideTitle ? null :
    <ModuleTitle>About Topics</ModuleTitle> }
    <InterfaceText>
        <HebrewText>
        བརྗོད་གཞིའི་ཤོག་ངོས་ཀྱིས་གཙོ་བོ་ཆེད་འདེམ་བྱས་པའི་བརྗོད་གཞི་སྟོང་ཕྲག་མང་པོའི་རྒྱུ་ཆ་རྣམས་བརྗོད་བྱའི་སྒོ་ནས་རིགས་སོ་སོར་དབྱེ་བའི་སྡེ་ཚན་གསལ་སྟོན་བྱེད་པ་ཡིན། དེའི་ཕྱིར་ཁྱེད་ཀྱིས་སྡེ་ཚན་རེ་རེ་བྱས་ཏེ་གཟིགས་ཐུབ་ཅིང་། བྱེ་བྲག་གིས་འཚོལ་ཞིབ་བྱེད་པ་ཡང་ན་བརྗོད་གཞི་རྒྱུགས་ཆེ་ཤོས་རྣམས་དང་དེ་འབྲེལ་གྱི་རྒྱུ་ཆ་ཁག་གཟིགས་ཞིབ་ཀྱང་བྱེད་ཆོག་པ་ཡིན།
        </HebrewText>
        <EnglishText>
        Topics Pages present a curated selection of various genres of sources on thousands of chosen subjects. You can browse by category, search for something specific, or view the most popular topics — and related topics — on the sidebar. Explore and click through to learn more.
        </EnglishText>
    </InterfaceText>
  </Module>
);


const TrendingTopics = () => (
  <Module>
    <ModuleTitle>Trending Topics</ModuleTitle>
    {Sefaria.trendingTopics.map((topic, i) =>
      <div className="navSidebarLink ref serif" key={i}>
        <a href={"/topics/" + topic.slug}><InterfaceText text={{en: topic.en, he: topic.he}}/></a>
      </div>
    )}
  </Module>
);


const RelatedTopics = ({title}) => {
  const [topics, setTopics] = useState(Sefaria.getIndexDetailsFromCache(title)?.relatedTopics || []);
  const [showMore, setShowMore] = useState(false);
  const showMoreLink = !showMore && topics.length > 5;
  const shownTopics = showMore ? topics : topics.slice(0,5);
  useEffect(() => {
        Sefaria.getIndexDetails(title).then(data => setTopics(data.relatedTopics));
  },[title]);
  return (topics.length ?
    <Module>
      <ModuleTitle>Related Topics</ModuleTitle>
      {shownTopics.map((topic, i) =>
        <div className="navSidebarLink ref serif" key={i}>
          <a href={"/topics/" + topic.slug}><InterfaceText text={{en: topic.title.en, he: topic.title.he}}/></a>
        </div>
      )}
      {showMoreLink ?
      <a className="moreLink" onClick={()=>{setShowMore(true);}}>
        <InterfaceText>More</InterfaceText>
      </a> : null}
    </Module> : null
  );
};


const JoinTheConversation = ({wide}) => {
  if (!Sefaria.multiPanel) { return null; } // Don't advertise create sheets on mobile (yet)

  return (
    <Module wide={wide}>
      <div>
        <ModuleTitle>Join the Conversation</ModuleTitle>
        <InterfaceText>Combine sources from our library with your own comments, questions, images, and videos.</InterfaceText>
      </div>
      <div>
        <a className="button small" href="/sheets/new">
          <img src="/static/icons/new-sheet-black.svg" alt="make a sheet icon" />
          <InterfaceText>Make a Sheet</InterfaceText>
        </a>
      </div>
    </Module>
  );
};


const JoinTheCommunity = ({wide}) => {
  return (
    <Module wide={wide}>
      <div>
        <ModuleTitle>Join the Conversation</ModuleTitle>
        <InterfaceText>People around the world use Sefaria to create and share Torah resources. You're invited to add your voice.</InterfaceText>
      </div>
      <div>
        <a className="button small" href="/community">
          <img src="/static/icons/community-black.svg" alt="make a sheet icon" />
          <InterfaceText>Explore the Community</InterfaceText>
        </a>
      </div>
    </Module>
  );
};


const GetTheApp = () => (
  <Module>{/*
    <ModuleTitle>Get the Mobile App</ModuleTitle>
    <InterfaceText>Access the Jewish library anywhere and anytime with the</InterfaceText> <a href="/mobile" className="inTextLink"><InterfaceText>Sefaria mobile app.</InterfaceText></a>
    <br />
    <AppStoreButton
        href="https://itunes.apple.com/us/app/sefaria/id1163273965?ls=1&mt=8"
        platform='ios'
        altText={Sefaria._("Sefaria app on IOS")}
    />
    <AppStoreButton
        href="https://play.google.com/store/apps/details?id=org.sefaria.sefaria"
        platform='android'
        altText={Sefaria._("Sefaria app on Android")}
    />*/}
  </Module>
);


const StayConnected = () => { // TODO: remove? looks like we are not using this
  const fbURL = Sefaria.interfaceLang == "hebrew" ? "https://www.facebook.com/pecha.org" : "https://www.facebook.com/pecha.org";

  return (
    <Module>
      <ModuleTitle>Stay Connected</ModuleTitle>
      <InterfaceText>Get updates on new texts, learning resources, features, and more.</InterfaceText>
      <br />
      {/*<NewsletterSignUpForm context="sidebar" />*/}

      <a target="_blank" className="button small white appButton iconOnly" href={fbURL}>
        <img src="/static/icons/facebook.svg" alt={Sefaria._("Pecha on Facebook")} />
      </a>
      <a target="_blank" className="button small white appButton iconOnly" href="https://x.com/pechadotorg">
        <img src="/static/icons/twitter.svg" alt={Sefaria._("Pecha on Twitter")} />
      </a>
      <a target="_blank" className="button small white appButton iconOnly" href="https://www.instagram.com/pecha_org/">
        <img src="/static/icons/instagram.svg" alt={Sefaria._("Pecha on Instagram")} />

      </a>
      <a target="_blank" className="button small white appButton iconOnly" href="https://www.youtube.com/channel/UCB1eWJqy97FBViE86l3Hf_g">
        <img src="/static/icons/youtube.svg" alt={Sefaria._("Pecha on YouTube")} />
      </a>

    </Module>
  );
};


const AboutLearningSchedules = () => (
  <Module>
    <ModuleTitle h1={true}>Learning Schedules</ModuleTitle>
    <InterfaceText>
        <EnglishText>
            Since biblical times, the Torah has been divided into sections which are read each week on a set yearly calendar.
            Following this practice, many other calendars have been created to help communities of learners work through specific texts together.
        </EnglishText>
        <HebrewText>
            מימי קדם חולקה התורה לקטעי קריאה שבועיים שנועדו לסיום הספר כולו במשך תקופת זמן של שנה.
            בעקבות המנהג הזה התפתחו לאורך השנים סדרי לימוד תקופתיים רבים נוספים, ובעזרתם יכולות קהילות וקבוצות של לומדים ללמוד יחד טקסטים שלמים.
        </HebrewText>
    </InterfaceText>
  </Module>
);


const AboutCollections = ({hideTitle}) => (
  <Module>
    {hideTitle ? null :
    <ModuleTitle h1={true}>About Collections</ModuleTitle>}
    <InterfaceText>
        <EnglishText>Collections are user generated bundles of sheets which can be used privately, shared with friends, or made public on Sefaria.</EnglishText>
        <HebrewText>אסופות הן מקבצים של דפי מקורות שנוצרו על ידי משתמשי האתר. הן ניתנות לשימוש פרטי, לצורך שיתוף עם אחרים או לשימוש ציבורי באתר ספריא.</HebrewText>
    </InterfaceText>
    {hideTitle ? null :
    <div>
      <a className="button small" href="/collections/new">
        <img src="/static/icons/collection-black.svg" alt="create a collection icon" />
        <InterfaceText>Create a Collection</InterfaceText>
      </a>
    </div>}
  </Module>
);


const ExploreCollections = () => (
  <Module>
    <ModuleTitle>Collections</ModuleTitle>
    <InterfaceText>Organizations, communities and individuals around the world curate and share collections of sheets for you to explore.</InterfaceText>
    <div>
      <a className="button small white" href="/collections">
        <img src="/static/icons/collection.svg" alt="collection icon" />
        <InterfaceText>Explore Collections</InterfaceText>
      </a>
    </div>
  </Module>
);


const WhoToFollow = ({toggleSignUpModal}) => (
  <Module>
    <ModuleTitle>Who to Follow</ModuleTitle>
    {Sefaria.followRecommendations.map(user =>
    <ProfileListing {...user} key={user.uid} toggleSignUpModal={toggleSignUpModal} />)}
  </Module>
);


const Image = ({url}) => (
  <Module>
    <img className="imageModuleImage" src={url} />
  </Module>
);


const Wrapper = ({title, content}) => (
  <Module>
    {title ? <ModuleTitle>{title}</ModuleTitle> : null}
    {content}
  </Module>
);


const IconLink = ({text, url, icon}) => (
  <div className="navSidebarLink gray">
    <img src={"/static/icons/" + icon} className="navSidebarIcon" alt={`${Sefaria._(text)} ${Sefaria._("icon")}`} />
    <a href={url}><InterfaceText>{text}</InterfaceText></a>
  </div>
);


const DownloadVersions = ({sref}) => {
    //sref is generally an index title, but just in case we ever need a different resolution
    const [versions, setVersions] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [downloadSelected, setDownloadSelected] = useState({dlVersionTitle: null, dlVersionFormat: null, dlVersionLanguage: null});

    const isVersionPublicDomain = v => {
        return !(v.license && v.license.startsWith("Copyright"));
    }
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let newState = {};
        if(name == "dlVersionName"){
           let [versionTitle, versionLang] = value.split("/");
           newState = {
              dlVersionTitle: versionTitle,
              dlVersionLanguage: versionLang
           };
        }else{
            newState = {[name]: value}
        }
        const dlstate = {...downloadSelected, ...newState};
        setDownloadSelected(dlstate);
        if (downloadParamsReady(dlstate)){
            setIsReady(true);
        }
    }
    const downloadParamsReady = (downloadParams) => {
        return !Object.values(downloadParams).some(x => x === null);
    }
    const versionDlLink = () => {
        return isReady ? `/download/version/${sref} - ${downloadSelected.dlVersionLanguage} - ${downloadSelected.dlVersionTitle}.${downloadSelected.dlVersionFormat}` : "#";
    }
    const handleClick = (event) => {
        if(!isReady) {
            event.preventDefault();
            return false;
        }
        recordDownload();
        return true;
    }
    const recordDownload = () => {
        Sefaria.track.event("Reader", "Version Download", `${sref} / ${downloadSelected.dlVersionTitle} / ${downloadSelected.dlVersionLanguage} / ${downloadSelected.dlVersionFormat}`);
    }
    useEffect(() => {
        Sefaria.getVersions(sref).then(data => {
            data = Object.values(data).flat();
            data = data.filter(isVersionPublicDomain);
            data.sort((a, b) => a.versionTitle.localeCompare(b.versionTitle));
            setVersions(data);
        });
    }, [sref]);

    return(
        <Module>
          <ModuleTitle>Download Text</ModuleTitle>
          <div className="downloadTextModule sans-serif">
          <Dropdown
              name="dlVersionName"
              options={
                versions.map(v => ({
                    value: `${v.versionTitle}/${v.language}`,
                    label: `${Sefaria._v({he: v.versionTitleInHebrew ? v.versionTitleInHebrew : v.versionTitle, en: v.versionTitle})} (${Sefaria._(Sefaria.translateISOLanguageCode(v.actualLanguage))})`
                })).concat( // add merged versions for both primary langs "en" and "he" where applicable. (not yet possible for individual actual languages)
                    versions.map(v => v.language).unique().map(lang => ({
                        value: `merged/${lang}`,
                        label: `${Sefaria._("Merged Version", "DownloadVersions")} (${Sefaria._(Sefaria.translateISOLanguageCode(lang))})`,
                    }))
                )
              }
              placeholder={Sefaria._( "Select Version", "DownloadVersions")}
              onChange={handleInputChange}
          />
          <Dropdown
              name="dlVersionFormat"
              options={[
                {value: "txt",       label: Sefaria._( "Text (with Tags)", "DownloadVersions")},
                {value: "plain.txt", label: Sefaria._( "Text (without Tags)", "DownloadVersions")},
                {value: "csv",       label: "CSV"},
                {value: "json",      label: "JSON"},
              ]}
              placeholder={Sefaria._("Select Format", "DownloadVersions")}
              onChange={handleInputChange}
          />
          <a className={`button fillWidth${isReady ? "" : " disabled"}`} onClick={handleClick} href={versionDlLink()} download>{Sefaria._("Download")}</a>
        </div>
        </Module>
    );
};


const PortalAbout = ({title, description, image_uri, image_caption}) => {
    return(
        <Module>
            <ModuleTitle en={title.en} he={title.he} />
            <div className="portalTopicImageWrapper">
                <ImageWithCaption photoLink={image_uri} caption={image_caption} />
            </div>
            <InterfaceText markdown={{en: description.en, he: description.he}} />
        </Module>
    )
};


const PortalMobile = ({title, description, android_link, ios_link}) => {
    return(
        <Module>
            <div className="portalMobile">
                <ModuleTitle en={title.en} he={title.he} />
                {description && <InterfaceText markdown={{en: description.en, he: description.he}} />}
                <AppStoreButton href={ios_link} platform={'ios'} altText='Steinsaltz app on iOS' />
                <AppStoreButton href={android_link} platform={'android'} altText='Steinsaltz app on Android' />
            </div>
        </Module>
    )
};
const PortalOrganization = ({title, description}) => {
    return(
        <Module>
                <ModuleTitle en={title.en} he={title.he} />
                {description && <InterfaceText markdown={{en: description.en, he: description.he}} />}
        </Module>
    )
};


const PortalNewsletter = ({title, description}) => {
    let titleElement = <ModuleTitle en={title.en} he={title.he} />;

    return(
        <Module>
            {titleElement}
            <InterfaceText markdown={{en: description.en, he: description.he}} />
            <NewsletterSignUpForm
                includeEducatorOption={false}
                emailPlaceholder={{en: "Email Address", he: "כתובת מייל"}}
                subscribe={Sefaria.subscribeSefariaAndSteinsaltzNewsletter}
            />
        </Module>
    )
};


export {
  NavSidebar,
  Modules,
  RecentlyViewed
};
