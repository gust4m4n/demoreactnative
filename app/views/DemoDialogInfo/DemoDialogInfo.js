import React, {Component} from 'react';
import {View, TouchableHighlight, Text, Platform, Modal} from 'react-native';
import PropTypes from 'prop-types';

export default class DemoDialogInfo extends Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        onOK: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleOK() {
        this.props.onOK();
    }

    render() {
        return (
            <Modal transparent={true} animationType={'none'} visible={this.props.visible}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0.0, 0.0, 0.0, 0.5)'}}>
                    <View style={{padding: 16, justifyContent: 'center', alignItems: 'stretch', backgroundColor : '#ffffff',
                        width: 310, borderRadius: 8}}>
							
                        <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: '#434343'
                        }}>{this.props.title}</Text>

                        <View style={{height: 16}}/>
                        <Text style={{fontSize: 15, textAlign: 'center', color: '#434343'}}>{this.props.message}</Text>
                        <View style={{height: 16}}/>

                        <TouchableHighlight style={{borderRadius: 8}} underlayColor='#434343' onPress={()=> this.handleOK()}>
                            <View style={{justifyContent: 'center', alignItems: 'center',
                                backgroundColor: '#eb3b5a', borderRadius: 8, height: 42}}>
                                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>OK</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                </View>
            </Modal>
        );
    }
}


