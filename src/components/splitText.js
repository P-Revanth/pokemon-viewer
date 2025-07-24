import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register SplitText plugin once globally if not already done elsewhere
gsap.registerPlugin(SplitText);

const SplitTextAnimation = ({ children, tagName = 'h2', ...props }) => {
    const el = useRef(); // Ref to the element that will contain the split text

    useEffect(() => {
        // Ensure GSAP and SplitText are ready
        if (!gsap.isTweening(el.current)) { // Prevent re-running if already animating
            gsap.set(el.current, { opacity: 1 }); // Make sure the element is visible

            const headlineSplit = SplitText.create(el.current, {
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
        }

        // Cleanup function for when the component unmounts
        return () => {
            if (headlineSplit) {
                headlineSplit.revert(); // Revert SplitText changes
            }
        };
    }, [children]); // Re-run effect if children change (though typically the text won't change often)

    // Render the children within the specified tagName
    // The 'el' ref will be attached to this element
    const Tag = tagName;

    return (
        <Tag ref={el} style={{ opacity: 0 }} {...props}> {/* Initial opacity 0 for fade-in effect */}
            {children}
        </Tag>
    );
};

export default SplitTextAnimation;