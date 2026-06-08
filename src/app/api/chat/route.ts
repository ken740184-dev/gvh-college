import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    // Fetch faculty list dynamically from the database
    let facultyContext = "";
    try {
      await connectToDatabase();
      const facultyList = await Faculty.find().lean();
      if (facultyList && facultyList.length > 0) {
        facultyContext = "\n- Faculty Members:\n" + facultyList.map((f: any) => `  * ${f.name} - ${f.designation} (${f.qualification || "No qualification listed"}, ${f.experience || "No experience listed"}), Specialization: ${f.specialization || "None"}`).join("\n");
      } else {
        facultyContext = "\n- Faculty: No faculty list in the database currently.";
      }
    } catch (dbError) {
      console.error("DB Faculty fetch error for chat:", dbError);
      facultyContext = "\n- Faculty: Unable to load faculty directory currently.";
    }

    const systemPrompt = `You are a helpful virtual assistant for Gudleppa Hallikeri Arts and Commerce First Grade College (formerly known as GVH PU College) in Hosaritti, Haveri District, Karnataka, India - 581115. 
    Answer questions about the college, admissions, courses (B.Com and B.A.), fees, contact details, and campus life using the following information:
    - College Name: Gudleppa Hallikeri Arts and Commerce First Grade College (formerly GVH College / GVH PU College)
    - Entrance location coordinates: 14.896620, 75.554571
    - Location address: Hosaritti, Haveri District, Karnataka, India - 581115
    - Course fee: B.Com is ₹45,000/year, B.A. is ₹35,000/year. One-time admission fee is ₹5,000.
    - Admissions: Admissions for the 2026 academic year are open! Apply online via the portal.
    - Contact Info: Admission Office phone is +1 (555) 123-4567, email is admissions@gvhcollege.edu.
    - Campus Facilities: Modern classrooms, well-stocked library, sports grounds, and active student clubs.
    - Principal: Dr. S. K. Verma, M.Sc., Ph.D., Post-Doc (UK)
    - Gudleppa Hallikeri (Heritage & History):
      * Gudleppa Hallikeri (1906–1972) was a prominent Indian freedom fighter, social reformer, and educationist from Karnataka, born in Hosaritti.
      * Known as the "Iron Man of Karnataka", he was a dedicated Gandhian.
      * He played a leading role in the Salt Satyagraha, Quit India Movement (imprisoned multiple times), and Karnataka Ekikarana (Unification) Movement.
      * He served as Mysore Legislative Council Chairman (1970-1971).
      * He founded Gandhi Grameena Gurukul in Hosaritti and helped establish our college in 1963 under K.L.E. Society.
      * The annual Gudleppa Hallikeri Award honors contributions to society/literature.
    ${facultyContext}
    Keep your responses polite, friendly, and concise (under 3 sentences). If you do not know the answer, politely ask them to contact the admission office.`;

    // Map history to Gemini API contents format
    const formattedContents = [];
    
    // Add system context as the first user turn and model acknowledgment
    formattedContents.push({
      role: "user",
      parts: [{ text: systemPrompt }]
    });
    
    formattedContents.push({
      role: "model",
      parts: [{ text: "Understood. I will act as the virtual assistant for Gudleppa Hallikeri Arts and Commerce First Grade College and answer questions concisely based on those details." }]
    });

    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        formattedContents.push({
          role: msg.isUser ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedContents,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate response from Gemini." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that. Can you try again?";

    return NextResponse.json({ response: botResponseText });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
