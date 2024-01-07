import { View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const BlogPostSkelton = () => {
  return (
    <SkeletonPlaceholder>
      <>
        <View
          style={{ width: "100%", height: 300, backgroundColor: "#F0F0F0" }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              width: "100%",
              height: 55,
              marginTop: 20,
              borderRadius: 4,
              backgroundColor: "#F0F0F0",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 18,
            }}
          >
            <View
              className=""
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View style={{ width: 24, height: 24, borderRadius: 50 }} />
              <View
                style={{
                  width: "40%",
                  height: 24,
                  marginLeft: 5,
                  backgroundColor: "#F0F0F0",
                }}
              />
            </View>
            <View
              style={{
                width: "40%",
                height: 24,
                marginLeft: 5,
                backgroundColor: "#F0F0F0",
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 55,
              marginTop: 20,
              borderRadius: 4,
              backgroundColor: "#F0F0F0",
            }}
          />
          <View
            style={{
              width: "100%",
              height: 55,
              marginTop: 20,
              borderRadius: 4,
              backgroundColor: "#F0F0F0",
            }}
          />
          <View
            style={{
              width: "100%",
              height: 55,
              marginTop: 20,
              borderRadius: 4,
              backgroundColor: "#F0F0F0",
            }}
          />
          <View
            style={{
              width: "100%",
              height: 55,
              marginTop: 20,
              borderRadius: 4,
              backgroundColor: "#F0F0F0",
            }}
          />
        </View>
      </>
    </SkeletonPlaceholder>
  );
};

export default BlogPostSkelton;
