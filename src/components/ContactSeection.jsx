import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Developer from "../components/Developer";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert.jsx";
import useAlert from "../hooks/useAlert.js";

const ContactSection = () => {
  const [animationName, setAnimationName] = useState("idle");

  const FormRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const typingTimeout = useRef(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });

    if (name === "name") setAnimationName("salute");
    if (name === "email") setAnimationName("clapping");
    if (name === "message") setAnimationName("salute");

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      setAnimationName("idle");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnimationName("victory");

    const primaryPayload = {
      from_name: "Vivek Kempraj",
      to_name: formData.name,
      from_email: "karthickramalagar@gmail.com",
      to_email: formData.email,
      message: formData.message,
    };

    const followupPayload = {
      to_name: formData.name,
      to_email: formData.email,
      name: formData.name,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      const primaryResponse = await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        primaryPayload,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      const followupResponse = await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_FOLLOWUP_TEMPLATE_ID,
        followupPayload,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setLoading(false);
      showAlert({
        text: `✅ Email sent successfully to BioOrgo and confirmation sent to ${formData.email}`,
        type: "success",
      });

      setTimeout(() => {
        hideAlert();
        setFormData({ name: "", email: "", message: "" });
        setAnimationName("idle");
      }, 3000);
    } catch (error) {
      setLoading(false);
      showAlert({
        text: `❌ Failed to send email. Please try again later.`,
        type: "danger",
      });

      setAnimationName("idle");
    }
  };

  return (
    <section
      className="c-space my-16 bg-gray-500/30 mx-2 rounded-3xl drop-shadow-xl"
      id="contact"
    >
      {alert.show && <Alert {...alert} />}

      {/* Unified Heading & Description */}
      <div className="text-center px-6  py-5 md:px-20 mt-12">
        <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Let's Connect
        </h3>
        <p className="text-xl md:text-2xl text-gray-700 font-bold mt-5">
          We're passionate about pioneering biochemical solutions. Reach out to
          discuss partnerships, innovative projects, or research collaborations
          with BioOrgo.
        </p>
      </div>

      {/* Content Row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-0">
        {/* Left - 3D Model */}
        <div className="w-full md:w-1/2 h-[600px] md:h-[700px] flex items-center justify-center">
          <Canvas className="w-full h-full">
            <ambientLight intensity={7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <directionalLight position={[10, 10, 10]} />
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
            <Suspense fallback={<CanvasLoader />}>
              <Developer
                position-y={-3}
                scale={3.5}
                animationName={animationName}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Right - Form Inputs */}
        <div className="w-full md:w-1/2">
          <form
            ref={FormRef}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col space-y-8 pb-4"
          >
            <label className="space-y-2">
              <span className="text-3xl font-bold text-green-600">
                Full Name
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 text-2xl font-bold rounded-xl bg-yellow-50 border-2 border-yellow-400 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Karthikeyan Rengaraj"
              />
            </label>

            <label className="space-y-2">
              <span className="text-3xl font-bold text-green-600">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 text-2xl font-bold rounded-xl bg-pink-50 border-2 border-pink-400 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Karthickramalagar@gmail.com"
              />
            </label>

            <label className="space-y-2">
              <span className="text-3xl font-bold text-green-600">
                Your Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-6 py-4 text-2xl font-bold rounded-xl bg-blue-50 border-2 border-blue-400 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Partner with BioOrgo — Let's Innovate in Biochemical Solutions Together."
              />
            </label>

            <button
              className="self-center mt-4 px-8 py-4 text-lg mb-4 md:mb-0 font-bold rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              <img
                src="/images/arrow-up.png"
                alt="arrow-up"
                className="inline-block ml-2 w-5 h-5"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
