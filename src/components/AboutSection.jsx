import React from "react";
import about from "../assets/about.jpg";

function AboutSection() {
  return (
    <section id="about" className="py-12 px-4 bg-[#3E2723]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#D7CCC8]">
          About Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="md:h-72 h-46 flex items-center justify-center ">
            <img src={about} alt="" className="h-full w-full rounded-xl" />
          </div>
          <div className="text-start text-[#8B6B5E]">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium doloremque fugiat totam nisi? Nostrum incidunt quas
              sed temporibus, est quam impedit quia nulla. Nulla labore ipsam
              architecto beatae ex, impedit numquam. Nesciunt commodi impedit
              reiciendis repudiandae quod neque sed eligendi repellendus
              quisquam eum, voluptate nisi voluptatibus quae beatae inventore
              qui?
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium doloremque fugiat totam nisi? Nostrum incidunt quas
              sed temporibus, est quam impedit quia nulla. Nulla labore ipsam
              architecto beatae ex, impedit numquam. Nesciunt commodi impedit
              reiciendis repudiandae quod neque sed eligendi repellendus
              quisquam eum, voluptate nisi voluptatibus quae beatae inventore
              qui?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
