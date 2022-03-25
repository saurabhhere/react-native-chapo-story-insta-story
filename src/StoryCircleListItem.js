import React, {useState, useEffect} from "react";
import {View, Image, TouchableOpacity, Text, StyleSheet, Platform} from "react-native";
import {usePrevious} from "./helpers/StateHelpers";

import DEFAULT_AVATAR from "./assets/images/no_avatar.png";

const StoryCircleListItem = (props) => {

    const {
        item,
        unPressedBorderColor,
        pressedBorderColor,
        avatarSize,
        showText,
        textStyle
    } = props;

    const [isPressed, setIsPressed] = useState(props?.item?.seen);

    const prevSeen = usePrevious(props?.item?.seen);

    useEffect(() => {
        if (prevSeen != props?.item?.seen) {
            setIsPressed(props?.item?.seen);
        }

    }, [props?.item?.seen]);

    const _handleItemPress = item => {
        const {handleStoryItemPress} = props;

        if (handleStoryItemPress) handleStoryItemPress(item);

        setIsPressed(true);
    };

    const size = avatarSize ?? 60;
    let height = item.screen === "restaurant" ? 200 : (avatarSize ?? 60) ;
    let width = item.screen === "restaurant" ? 120 : (avatarSize ?? 60) ;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => _handleItemPress(item)}
                style={[
                    styles.avatarWrapper,
                    {
                        height: height + 3,
                        width: width + 3,
                        borderRadius: item.screen === "restaurant" ? 10 : 100
                    },
                    !isPressed
                        ? {
                            borderColor: unPressedBorderColor
                                ? unPressedBorderColor
                                : 'red'
                        }
                        : {
                            borderColor: pressedBorderColor
                                ? pressedBorderColor
                                : 'grey'
                        }
                ]}
            >
                <Image
                    style={{
                        height: height,
                        width: width,
                        borderRadius: item.screen === "restaurant" ? 10 : 100
                    }}
                    source={{uri: item.screen === "restaurant" ? item.stories[0].story_image : item.user_image}}
                    defaultSource={Platform.OS === 'ios' ? DEFAULT_AVATAR : null}
                />
            </TouchableOpacity>
            {showText && item.screen !== "restaurant" &&
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{
                        width: size + 4,
                        ...styles.text,
                        ...textStyle
                    }}>{item.user_name}</Text>}
        </View>
    );
}

export default StoryCircleListItem;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginRight: 10
    },
    avatarWrapper: {
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderColor: 'red',
        height: 64,
        width: 64
    },
    text: {
        marginTop: 3,
        textAlign: "center",
        alignItems: "center",
        fontSize: 11
    }
});
