import React, { useRef, useEffect } from "react";
import { ScrollView, Image, Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

const SLIDER_TOUR_DATA = [
    
      require("../../assets/add3.jpeg"),
   
       require("../../assets/add4.png"),
   
       require("../../assets/add5.png"),
    
     require("../../assets/add22.jpeg"),
    
       require("../../assets/add23.png"),
    
    
  ];

export default function TourSliderSection() {
  const scrollRef = useRef(null);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      index = (index + 1) % SLIDER_TOUR_DATA.length;

      scrollRef.current?.scrollTo({
        x: index * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ height: 160, marginTop: 10,marginBottom:10 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {SLIDER_TOUR_DATA.map((item, index) => (
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
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
