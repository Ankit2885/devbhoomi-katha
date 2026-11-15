import T from "@/components/T";
import { Divider } from "@/components/Ornaments";
import SocialLinks from "@/components/SocialLinks";

export const metadata = { title: "परिचय" };

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="ph-ic">🙏</div>
          <h1><T hi="परिचय" hg="Parichay" /></h1>
          <p><T hi="देवभूमि कथा के बारे में" hg="Devbhoomi Katha ke baare mein" /></p>
        </div>
      </section>
      <div className="wrap-narrow sec">
        <div className="prose">
          <div className="l-hi">
            <p>उत्तराखंड को यूँ ही <strong>देवभूमि</strong> नहीं कहा जाता। यहाँ हर गाँव का अपना देवता है, हर पहाड़ की अपनी कथा और हर नदी की अपनी मान्यता।</p>
            <p><strong>देवभूमि कथा</strong> इन्हीं कथाओं को एक जगह सहेजने की कोशिश है — गोलू देवता से नंदा देवी तक, जागर से राजजात तक। साथ ही हम उन सवालों पर भी बात करते हैं जो अक्सर मन में आते हैं: <em>ऐसा क्यों होता है?</em></p>
            <p>हम हर कथा को मान्यता, इतिहास और विज्ञान — तीनों नज़रिए से रखने की कोशिश करते हैं, ताकि आस्था का सम्मान भी हो और जानकारी भी सही रहे।</p>
            <p>अगर आपके गाँव की कोई कथा या परंपरा है जो दुनिया तक पहुँचनी चाहिए, तो हमें ज़रूर बताइए।</p>
          </div>
          <div className="l-hg">
            <p>Uttarakhand ko yun hi <strong>Devbhoomi</strong> nahi kaha jaata. Yahan har gaon ka apna devta hai, har pahad ki apni katha aur har nadi ki apni manyata.</p>
            <p><strong>Devbhoomi Katha</strong> inhi kathaon ko ek jagah sahejne ki koshish hai — Golu Devta se Nanda Devi tak, Jagar se Raj Jat tak. Saath hi hum un sawalon par bhi baat karte hain jo aksar mann mein aate hain: <em>aisa kyon hota hai?</em></p>
            <p>Hum har katha ko manyata, itihaas aur vigyan — teeno nazariye se rakhne ki koshish karte hain, taaki aastha ka samman bhi ho aur jaankari bhi sahi rahe.</p>
            <p>Agar aapke gaon ki koi katha ya parampara hai jo duniya tak pahunchni chahiye, to humein zaroor bataiye.</p>
          </div>
        </div>
        <Divider />
        <div className="join">
          <h2><T hi="संपर्क करें" hg="Sampark karein" /></h2>
          <p><T hi="अपनी कथा, सुझाव या सवाल भेजने के लिए हमसे यहाँ जुड़ें:" hg="Apni katha, sujhav ya sawaal bhejne ke liye humse yahan judein:" /></p>
          <SocialLinks />
        </div>
      </div>
    </>
  );
}
