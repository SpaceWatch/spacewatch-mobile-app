import { useHistory } from 'react-router-native';
import {Button, View} from "react-native";
import React from "react";
import Routes from "../routes";

const WatcherList = () => {
    const history = useHistory();

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            <Button
                title="Back To Home"
                onPress={async () => {
                    history.push(Routes.HOME);
                }}
            />
        </View>
    );
}

export default WatcherList;
