import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import "gsap/ScrollTrigger";
import "gsap/ScrollToPlugin";

gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
    gsap.set("h1", { opacity: 1 });

    const headlineSplit = SplitText.create("h1", {
        type: "words",
        wordsClass: "word++",
        ignore: "sup"
    });

    gsap.from(headlineSplit.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        stagger: 0.1,
        duration: 1,
        ease: "back"
    });
});