import React, { useRef, useEffect } from "react";
import { ScrollView, Image, Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

const SLIDER_DATA = [
    
      require("../../assets/b1.png"),
   
       require("../../assets/b2.png"),
   
       require("../../assets/b3.png"),
    
     require("../../assets/b1.png"),
    
       require("../../assets/b2.png"),
    
      require("../../assets/b2.png"),
    
  ];

export default function SliderSection() {
  const scrollRef = useRef(null);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      index = (index + 1) % SLIDER_DATA.length;

      scrollRef.current?.scrollTo({
        x: index * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ height: 160, marginTop: 0 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {SLIDER_DATA.map((item, index) => (
          <View
            key={index}
            style={{
              width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={item}
              resizeMode="cover"
              style={{
                width: width - 10,
                height: 160,
                borderRadius: 10,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
