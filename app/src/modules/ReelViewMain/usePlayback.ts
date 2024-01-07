import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AVPlaybackStatusSuccess, Video } from "expo-av";
import { useCallback, useRef, useState } from "react";
import { BackHandler } from "react-native";

export const usePlayback = () => {
  const navigation = useNavigation();
  const targetRef = useRef<Video | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [playbackDur, setPlaybackDur] = useState<number>(0);
  // let timeout: number;
  const [timeout, setTimeoutElement] = useState<NodeJS.Timeout>();

  const handlePlaybackStatus = (status: AVPlaybackStatusSuccess) => {
    setIsPaused(!status.isPlaying);
    setPlaybackDur(status.positionMillis);
  };

  const handlePressStart = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setShowOverlay(true);
  };

  const handlePressEnd = () => {
    const el = setTimeout(() => {
      setShowOverlay(false);
    }, 1500);

    setTimeoutElement(el);
  };

  const onPlayPause = () => {
    if (targetRef.current) {
      if (isPaused) {
        targetRef.current.playAsync();
      } else {
        targetRef.current.pauseAsync();
      }
      setShowOverlay(false);
    }
  };

  const onBackward = () => {
    if (targetRef.current) {
      targetRef.current.playFromPositionAsync(playbackDur - 10000);
      setShowOverlay(false);
    }
  };

  const onForward = () => {
    if (targetRef.current) {
      targetRef.current.playFromPositionAsync(playbackDur + 10000);
      setShowOverlay(false);
    }
  };

  const onMuteUnmute = () => {
    setIsMuted(!isMuted);
    setShowOverlay(false);
  };

  const onBack = async () => {
    if (targetRef.current) {
      await targetRef.current.pauseAsync();
    }
    navigation.goBack();
  };

  const onNativeBack = useCallback(() => {
    const onBackPress = () => {
      onBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  useFocusEffect(onNativeBack);

  return {
    targetRef,
    showOverlay,
    isPaused,
    isMuted,
    playbackDur,
    handlePlaybackStatus,
    handlePressStart,
    handlePressEnd,
    onPlayPause,
    onBackward,
    onForward,
    onMuteUnmute,
    onBack,
  };
};
