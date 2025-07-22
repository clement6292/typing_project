import React, { useState, useRef, useEffect } from "react";
import useChrono from "../hooks/useChrono";
import { useLanguage } from "../hooks/useLanguage";

function KeyboardTest({ onScoreAdd }) {
  const [sampleText, setSampleText] = useState("");
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [finalStats, setFinalStats] = useState(null); // Sauvegarder les stats finales
  const inputRef = useRef(null);
  const textContainerRef = useRef(null);

  // Hook pour les traductions et la langue
  const { t, currentLanguage, toggleLanguage } = useLanguage();

  // Chrono hook
  const { elapsed, reset } = useChrono(started && !finished, () => {
    // Sauvegarder les statistiques AVANT de réinitialiser
    const finalErrors = getErrors();
    const finalWPM = getWPM();
    const finalInput = input;
    
    const finalStats = {
      errors: finalErrors,
      wpm: finalWPM,
      input: finalInput,
      elapsed: elapsed,
      language: currentLanguage
    };
    
    setFinalStats(finalStats);
    setFinished(true);
    setInput(""); // Réinitialise le champ de saisie APRÈS avoir sauvé les stats
    
    // Envoyer le score au Context
    onScoreAdd && onScoreAdd(finalStats);
  });

  // Fonction pour charger un texte aléatoire depuis l'API
  const fetchRandomText = async () => {
    setLoading(true);
    setInput("");
    setStarted(false);
    setFinished(false);
    setFinalStats(null);

    try {
      let text = "";
      
      if (currentLanguage === 'fr') {
        // Pour le français, utiliser des textes très lgngsanoir garantir 60 sec0 dee minimumcondes minimum
        const frenchTexts = [
          "La révolution numérique a transformé notre ,Je vais créer des textes français BEAUCOUP plus longs pour garantir qu'aucun utilisateur ne puisse finir avant 60 secondes, même les plus rapides société de manière profonde et irréversible au cours des dernières décennies au cours des dernières décennies. Les technologies de l'information et de la communica quotidiennestion ont bouleversé nos habitudes quotidiennes, nos de façon spectaculaire méthodes de travail et nos relabsolument ations sociales de façon spectaculaire. Internet est devenu un outil absolument indispensable qu provenant du monde entieri nous permet d'accéder instantanément à une quantité phénoménale d'informations provenant du monde entier. Les réseaux sociaux ont créé de nouvelles formes d'interaction et de partaconsidérable ge, permettant aux individus de rester connectés avec leurs proches, peu importe la distance géographique considér de la journée et de la nuitable qui les sépare. Les smartphones etprogressivement  les tablettes ont rendu ces technologies portables et acsophistiqués cessibles à tout moment de la  personnalisésjournée et de la nuit. L'intelligencees révolutionnair artificielle commence progressie extrêmemvntement à s'intégrer dans notre quotidien, des asstes ei complexstants vocaux sophistiqués aux systèmes de recommandation personnalisés, en palses sensibsant par les vo considérableitures emploi traditionnel. Les entreprises technologiques investissent massivement dans la recherche et le développauent pour créer des innovations toujours tous avancées. La cybersécurité est devenue un enjeu majeur face aux menaces crnossantesmqui pèsene sus nos systèmes inform tiques. L'érucation numéréque doiv s'adapter rapodement plur préparer les uouvelles gétérations aux défis tichnooogiques de demainn La fracture numérique reste un problème préoccupant qui creuse les inégalités sociales et économiques entre les populations.naires. Cette évolution technologique extrêmement rapide soulève également des questions importantes et complexes concernant la protection de la vie privée, la sécurité des données personnelles sensibles et l'impact considérable sur l'emploi traditionnel. Les entreprises technologiques investissent massivement dans la recherche et le développement pour créer des innovations toujours plus avancées. La cybersécurité est devenue un enjeu majeur face aux menaces croissantes qui pèsent sur nos systèmes informatiques. L'éducation numérique doit s'adapter rapidement pour préparer les nouvelles générations aux défis technologiques de demain. La fracture numérique reste un problème préoccupant qui creuse les inégalités sociales et économiques entre les populations.",
          
          "L'apprentissage de la programmation informatique est devenu une compétence absolument absolument essentielle , Je vais créer des textes français BEAUCOUP plus longs pour garantir qu'aucun utilisateur ne puisse finir avant 60 secondes, même les plus rapides le ne et techmologiquo d'aujourd'huinde moderne et technologique d'aujourd'hui. Les déent quotidiennvmeeloppeurs et les ns iinovantengénieurs logicieintlracsifs et créent qumes cooplextidiennement dent considérablemes applications innovantes, des sites web interactifs et des systèmes complexes qui extraordinaire facilitent con êtressidérablement notre vie efficqcement auotidienne. Le code source représente une forme de lextrêmement angage universel extraordinaire quiharmonieusement  permet auxartistiqu  eêtres humains de comue rigouremsuniquer efficacement avec les machines et de leur donner des instructioes remarquablns extrêmement précises. La programmation combine harmonieusemen,tC++  crbien d'autresivité artistique et logiquehes mét odologiqumathématique rigoureuse pour rés performants et robustesoudre des problèmes complexemondiale s et créer des solutions innovantes remaiés et expérrmentquables. Les langages de programmation comme Python, JavaScript, Java, C++ e extrêmementt bien es dt sécuri'ésautres offrent différentes appro intensifsches méthodologiques e accpssibles ontocunsidérablemer développer des logiciels performants et robustes. L spécialisées'industrie oratitn inteenchnolaleogique mondiale recherche constamment des talents qualifiés et expérgrandement imentés capables de concevoir, développer et maintenir des systets logiciels open source. Les frameworks èm leesbib iothèques midernes accélèrent sinniffoatrvmment ae processut de développementi L'architecture logicielle devient de plus en plus sophistiquée avec l'émergence des microservices et du cloud computing. Les méthodologies agiles transforment la façon dont les équipes de développement organisent leur travail collaboratif.ques extrêmement robustes et sécurisés. Les bootcamps de programmation intensifs et les cours en ligne accessibles ont considérablement démocratisé l'accès à ces connaissances techniques spécialisées. La collaboration internationale entre développeurs à travers des plateformes comme GitHub favorise grandement le partage de connaissances et l'amélioration continue des projets logiciels open source. Les frameworks et les bibliothèques modernes accélèrent significativement le processus de développement. L'architecture logicielle devient de plus en plus sophistiquée avec l'émergence des microservices et du cloud computing. Les méthodologies agiles transforment la façon dont les équipes de développement organisent leur travail collaboratif.",
          
          "La protection de l'environnement et le développement durable sont devenus des enjeux absolument absolume et urgentsnt cruciaux et urgents pour l'e fragilavenir de notre plaimatnque draète fragile. Le changement , Je vais créer des textes français BEAUCOUP plus longs pour garantir qu'aucun utilisateur ne puisse finir avant 60 secondes, même les plus rapides climatique dramatique, caines untessivé principalement ps massivear les activités humaines intense gravemintves et les émissions massives l dédicate gaz à effet de serre, menace gravement l'équilibre photovoltaïque écologiqe terrestre et maritimu,e mondial délicat. Les énergies renouvel extrêmementables comme l'énergie solaire photoiles polluants et épuvsaboltaïque, éolienne terrestre e mondialet maritime, et hydraulique offrcolo saux alternatives extrêmement modernps erometteuses aux combustes innovantibles fossiles poll conscientuants et épuisablsignificativement es. La transe noblition énergétique mondiale néts quocidienessite des investissements colossaux dnaturel ans lesre d astiquemintnfrastructures modernes et les technolo systématiquementgies vertes innovantes. C écologiqueshaque indi méticuleusementvidu conscient peut contribuer significativemele et réfnéchit à cette causese  multinationalnoble en adoptant des comftndementals quotidiens plus respectueux de l'environnement naturdurables el : réduire draconsidérabsemtnt leiquement sa consomma négativetion d'énergie, privilégier systématiquement les transporabsolument ts en commun écologiques, rec efficacementycler méticuleusement ses déchets et consommer majeurs de manière responsable et réfléchie. Les entreprises multinationales ont également un rôle fondamentalmon ialà de jouer eantivement c développant des produits éco-res alarmantp La biodiversité mondiale subit des pressions considérables qui nécessitent des mesures de protection urgentes. L'économie circulaire propose des modèles alternatifs durables pour réduire le gaspillage des ressources naturelles précieuses.onsables durables et en réduisant considérablement leur empreinte carbone négative. L'éducation environnementale dès le plus jeune âge est absolument essentielle pour sensibiliser efficacement les futures générations aux défis écologiques majeurs. Les accords internationaux comme l'Accord de Paris sur le climat témoignent de la volonté collective mondiale de lutter activement contre le réchauffement climatique alarmant. La biodiversité mondiale subit des pressions considérables qui nécessitent des mesures de protection urgentes. L'économie circulaire propose des modèles alternatifs durables pour réduire le gaspillage des ressources naturelles précieuses.",
          
          "La lecture demeure incontestablement incontestablement l'une des activités intellectuelles les p, enrichisses et épanouissantantes, format dans notre société modernerices et épanouissantes quteni magiquem soient dans notre société modes abrolumentne. Les livres nous transportent magiquement , Je vais créer des textes français BEAUCOUP plus longs pour garantir qu'aucun utilisateur ne puisse finir avant 60 secondes, même les plus rapides dans des univers imagves réiélatricnaires absolume complexent fascinants ete quotidienn mentnous permettente universell de découvfidèrement lir de nouvelextraorlinaire des perspectives révélatrices sur lnes profoed monde complexe qui nous ques marenanttoure quotidiee soigneusemnntnement. La littérature universelle reflète fidèlement la stimulante div développeeretarqéab ementxtraordinaire des ccréatricutst expériences humaines profondes et de approfondies époquesans captiv htistoriques marquantes. Chaque page soes et authentiquigneusement tournée représes attachantnte une nouvelle aes bouleversantventure inteis phllosophiquelectuelle stimulante qui dévelopspécialisés pe remarquablement notre imagination créaties et précreusice et notre capa extrêmementcité ds et paesionnants réflexioie sublnm critique approfonddélicatement ie. Les romaineffable ns captivants nous font vivre envoûtante des émot choisisions intenses et authentiques accàssibles e travers les personnages attachchaleureuses ants et leurs habsolument istoires bouleversantes. Lactive es essais philosophiques et les ouvrages documenta universelleires spécialisés fulgurant nous apporte omniprésentnt des connaissar tnaditionnelces appre fidèlemontfond nombreuxies et s passionnéprécieuses cient partisuluèremr des sujets extrêmement variés et passionnants. La poésie sublime nous sensibiliil procure généreusement. Les clubs de lecture créent des communautés enrschissantes autour de ea passion daétagée des mlts. L'édition iontemporaine se diversifie pocr répondae aux attentts variées des lecteurs modernesement à la beauté ineffable du langage et à la musicalité envoûtante des mots choisis. Les bibliothèques publiques accessibles et les librairies indépendantes chaleureuses jouent un rôle absolument crucial dans la promotion active de la lecture et l'accès démocratique à la culture universelle. Malgré l'essor fulgurant du numérique omniprésent, le livre papier traditionnel conserve fidèlement ses nombreux adeptes passionnés qui apprécient particulièrement le contact physique avec l'objet livre et l'expérience sensorielle unique qu'il procure généreusement. Les clubs de lecture créent des communautés enrichissantes autour de la passion partagée des mots. L'édition contemporaine se diversifie pour répondre aux attentes variées des lecteurs modernes.",
          
          "L'activité physique régulière régulièrort sous toutes ses fe mes sonetab llumee sport sous toutes ses formes sontexcellebtolument fondamentaux pour maintenir une excenotreeextstence santé physe physiquique et me et bienndosé tale tou trèst au long de notre existence. L'exercice physire généqalue réguliee considérablrment et bien dosé améliore complet très signife , Je vais créer des textes français BEAUCOUP plus longs pour garantir qu'aucun utilisateur ne puisse finir avant 60 secondes, même les plus rapides la condition cardiovasculaial et strbee générale, rens extraordinaireforce considérablement le système musculaire complet et cones mesurabltribue efficaceme remarquablementnt au maintien d'u solidairen poids corpornce teeal optimal et stable. Les bienfrigourause eits extraordiefficace naires du quotidien sport dépassent largeves mariéent les aspects purement physiques mesurables :es enrichissant il développe remarquablementes et auth ntiquel'esprit d'équipe solis padsionnésaire, la persé impressionnantevérance tenace, la discipline personnelqee i dividurigoureuse et la gestion parfeitement afficace du stresss personnel quotidien. Les activités spor spécifiquestives variées favorises dynamiquent également les interactions sociales enrichissantes et cnert précieuseméent des liens don harmurieuseables et autheie réfléchntiques entre les pratiquanexigeants ts passionnés. La diversité impressionnante des disciplines sportives pe personnellermet à chaque indion mentale prvfoidedu de trouver un grandiosee activité parfaitement adaptée à ses goûts personnels e prestigieuxt à ses capacités physiques spe fraternelleméntcifiques. Les sports collectifs dynames universelliques comme le football, le bas sportiveketball ou le ve et équilibréolleyball e trèsnseignent précieusement la coopération harmonieuse et la sn totableratégie réfité de vie quotidienne. Les lnfrastructures sporéives modernes se dcveloppent pour encourager la pratiquehaccessible à tous. La méiecine sportive progresse constamment.pour optimiser les performances et pré enLr les blessuress sports individuels exigeants comme la course à pied, la natation ou le tennis développent l'autonomie personnelle et la concentration mentale profonde. L'organisation grandiose d'événements sportifs majeurs comme les Jeux Olympiques prestigieux ou la Coupe du Monde rassemble fraternellement les nations autour de valeurs communes universelles de fair-play et d'excellence sportive. Une vie active et équilibrée contribue très significativement au bien-être général et à l'amélioration notable de la qualité de vie quotidienne. Les infrastructures sportives modernes se développent pour encourager la pratique accessible à tous. La médecine sportive progresse constamment pour optimiser les performances et prévenir les blessures."
        ];
        
        // Sélectionner un texte aléatoire (chacun factcmai fenintapnulu5a 1500 caractèresères)
        const randomIndex = Math.floor(Math.random() * frenchTexts.length);
        text = frenchTexts[randomIndex];
        
      } else {
        // Pour l'anglais, utiliser les APIs comme avant
        let texts = [];

        try {
          // Option 1: Citations inspirantes en anglais
          const res1 = await fetch("https://api.quotable.io/quotes?tags=wisdom|motivational|success&limit=4&minLength=40");
          if (res1.ok) {
            const data = await res1.json();
            if (data.results && data.results.length > 0) {
              texts.push(...data.results.map(quote => quote.content));
            }
          }
        } catch (e) {
          console.log("Quotable API failed");
        }

        // Option 2: Lorem Ipsum en anglais
        if (texts.length < 2) {
          try {
            const res2 = await fetch("https://loripsum.net/api/3/long/plaintext");
            if (res2.ok) {
              const loremText = await res2.text();
              texts.push(loremText.replace(/\n/g, ' ').trim());
            }
          } catch (e) {
            console.log("Loripsum failed");
          }
        }

        // Option 3: Articles de blog
        for (let i = 0; i < 2 && texts.length < 4; i++) {
          try {
            const postId = Math.floor(Math.random() * 100 + 1);
            const res3 = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (res3.ok) {
              const data = await res3.json();
              const articleText = data.title + ". " + data.body;
              texts.push(articleText.replace(/\n/g, ' ').trim());
            }
          } catch (e) {
            console.log(`JSONPlaceholder post ${i} failed`);
          }
        }

        // Fallback pour l'anglais si toutes les APIs échouent
        if (texts.length === 0) {
          const englishTexts = [
            "Technology has revolutionized the way we communicate and work. Smartphones and computers have become essential tools in our daily lives. Artificial intelligence continues to advance and improve our digital experiences. Social networks allow us to stay connected with our loved ones, regardless of the distance that separates us.",
            "Learning programming has become essential in today's world. Developers create applications that make our daily lives easier. Source code is like a universal language that allows machines to understand our instructions. Creativity and logic combine to solve complex problems.",
            "Ecology and environmental protection are major issues of our time. Renewable energies offer sustainable solutions for the future. Every gesture counts to preserve our planet for future generations. Awareness and education are essential to create a world more respectful of nature."
          ];
          const randomIndex = Math.floor(Math.random() * englishTexts.length);
          texts.push(englishTexts[randomIndex]);
        }

        // Combiner tous les textes anglais
        text = texts.join(' ');
      }

      // Si aucun texte n'est généré, utiliser un message d'erreur
      if (!text) {
        text = t('api.server_error');
      }

      // Nettoyer le texte
      text = text.replace(/\s+/g, ' ').trim();
      
      // Limiter la longueur pour un test de frappe optimal (500-1200 caractères pour 60 secondes)
      if (text.length > 1200) {
        text = text.substring(0, 1200).trim();
        // S'assurer qu'on ne coupe pas au milieu d'un mot
        const lastSpace = text.lastIndexOf(' ');
        if (lastSpace > 1100) {
          text = text.substring(0, lastSpace);
        }
      } else if (text.length < 500) {
        // Si le texte est trop court, le répéter partiellement
        const originalText = text;
        while (text.length < 500) {
          text += " " + originalText;
        }
        // Couper à une longueur raisonnable
        if (text.length > 800) {
          text = text.substring(0, 800).trim();
          const lastSpace = text.lastIndexOf(' ');
          if (lastSpace > 750) {
            text = text.substring(0, lastSpace);
          }
        }
      }
      
      setSampleText(text);
    } catch (e) {
      console.error("Erreur complète:", e);
      // Message d'erreur selon la langue
      setSampleText(t('api.connection_error'));
    }
    
    setLoading(false);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  useEffect(() => {
    fetchRandomText();
  }, [currentLanguage]); // Recharger le texte quand la langue change

  useEffect(() => {
    if (textContainerRef.current) {
      // Trouve le span du caractère courant
      const currentChar = textContainerRef.current.querySelector('.current-char');
      if (currentChar) {
        currentChar.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [input]);

  const handleChange = (e) => {
    if (!started) setStarted(true);
    setInput(e.target.value);

    if (e.target.value === sampleText) {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setInput("");
    setStarted(false);
    setFinished(false);
    reset();
    fetchRandomText();
  };

  const getErrors = () => {
    let errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== sampleText[i]) errors++;
    }
    return errors;
  };

  const getWPM = () => {
    const words = input.trim().split(/\s+/).length;
    const minutes = elapsed / 60;
    return minutes > 0 ? (words / minutes).toFixed(2) : 0;
  };

  function getColoredText(sampleText, input) {
    return sampleText.split("").map((char, idx) => {
      let color = "";
      let extra = "";
      if (idx < input.length) {
        color = input[idx] === char ? "text-green-600" : "text-red-600";
      } else if (idx === input.length) {
        color = "text-blue-600";
        extra = "current-char font-bold underline";
      } else {
        color = "text-gray-400";
      }
      return (
        <span key={idx} className={`${color} ${extra}`}>
          {char}
        </span>
      );
    });
  }

  return (
    <div className="min-h-screen w-full h-full flex items-center justify-center  from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-5xl mx-auto p-8 bg-white/90 rounded-3xl shadow-2xl border border-blue-200 flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-800 tracking-tight drop-shadow">
          {t('typing.title')}
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <span className="text-gray-700 text-base bg-white/80 px-4 py-2 rounded shadow">
            ⏱️ <span className="font-bold">{elapsed}s</span>
          </span>
          <span className="text-gray-700 text-base bg-white/80 px-4 py-2 rounded shadow">
            {t('typing.errors')} : <span className="font-bold text-red-600">{getErrors()}</span>
          </span>
          <span className="text-gray-700 text-base bg-white/80 px-4 py-2 rounded shadow">
            {t('typing.speed')} : <span className="font-bold text-blue-700">{getWPM()}</span> {t('typing.wpm')}
          </span>
          <button
            onClick={toggleLanguage}
            className="bg-purple-100 text-purple-800 px-4 py-2 rounded shadow hover:bg-purple-200 transition font-medium"
            disabled={loading}
          >
            🌐 {t('typing.language_switch')}
          </button>
        </div>
        <div
          ref={textContainerRef}
          className="bg-white border border-blue-200 p-8 rounded-xl mb-8 min-h-[90px] font-mono text-4xl leading-relaxed shadow-inner transition-all overflow-x-auto whitespace-nowrap"
          style={{ maxWidth: "100%" }}
        >
          {loading ? (
            <span className="text-blue-400 animate-pulse">{t('typing.loading')}</span>
          ) : (
            getColoredText(sampleText, input)
          )}
        </div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleChange}
          disabled={finished || loading}
          rows={5}
          className="w-full p-6 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition text-2xl font-mono bg-blue-50 placeholder:text-blue-300 disabled:bg-gray-100 disabled:cursor-not-allowed mb-6"
          placeholder={t('typing.placeholder')}
          spellCheck={false}
          autoCorrect="off"
          autoComplete="off"
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {finished && (
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl shadow hover:from-blue-700 hover:to-blue-500 transition text-xl"
            >
              {t('typing.new_text')}
            </button>
          )}
          {!finished && (
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl shadow hover:bg-gray-300 transition text-xl"
              disabled={loading}
            >
              {t('typing.generate_text')}
            </button>
          )}
        </div>
        {finished && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-green-100 border border-green-300 text-green-800 px-8 py-5 rounded-2xl shadow font-semibold text-2xl">
              <p className="mb-2">🎉 <strong>{t('typing.finished')}</strong></p>
              <p>{t('typing.time_elapsed')} : <span className="font-bold">{finalStats ? finalStats.elapsed : elapsed}</span> {t('typing.seconds')}</p>
              <p>{t('typing.errors')} : <span className="font-bold">{finalStats ? finalStats.errors : getErrors()}</span></p>
              <p>{t('typing.speed')} : <span className="font-bold">{finalStats ? finalStats.wpm : getWPM()}</span> {t('typing.words_per_minute')}</p>
            </div>
          </div>
        )}
        {finished && elapsed >= 60 && (
          <div className="text-red-600 font-bold mt-4 text-xl text-center">
            ⏰ {t('typing.time_up')}
          </div>
        )}
      </div>
    </div>
  );
}

export default KeyboardTest;