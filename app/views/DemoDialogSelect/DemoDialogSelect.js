import React, {Component} from 'react';
import {View, TouchableHighlight, Text, Modal, FlatList, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class DemoDialogSelect extends Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        list: PropTypes.array.isRequired,
        selectionIndex: PropTypes.number.isRequired,
        onCancel: PropTypes.func.isRequired,
        onOK: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectionIndex: this.props.selectionIndex,
        };
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleOK() {
        this.props.onOK(this.state.selectionIndex);
    }

    render() {
        return (
            <Modal transparent={true} animationType={'none'} visible={this.props.visible}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0.0, 0.0, 0.0, 0.5)'}}>

                    <View style={{height: 410, padding: 0,
                        justifyContent: 'center', alignItems: 'stretch', backgroundColor : '#ffffff',
                        width: 310, borderRadius: 8, borderWidth: 0}}>

                        <View style={{flexDirection: 'column', height: 50, backgroundColor: 'transparent', justifyContent: 'center',
                            alignItems: 'center'}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: '#434343'
                            }}>{this.props.title}</Text>
                        </View>

                        <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3'}}/>

                        <FlatList
                            style={{flex: 1, width: '100%', height: '100%'}}
                            data={this.props.list}
                            showsVerticalScrollIndicator={true}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={{paddingLeft: 16, paddingRight: 16}}>
                                    <View style={{width: '100%', height: 0.5, backgroundColor: '#d3d3d3'}}/>
                                    </View>
                                );
                            }}
                            renderItem={({item, index}) =>
                                <TouchableHighlight underlayColor='#cdcdcd' onPress={() =>
                                    this.setState({selectionIndex: index})}>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8}}>
                                        <Text style={{flex: 1, flexDirection: 'column',
                                            textAlignVertical: 'center', fontSize: 15,
                                            fontWeight: this.state.selectionIndex === index ? ('bold') : ('normal'),
                                            color: '#434343'}}>{item}</Text>
                                        {
                                            this.state.selectionIndex === index ? (
                                                <Image style={{width: 22, height: 22}}
                                                        source={require('../../images/ic_demo_checkmark.png')}
                                                        resizeMode={'contain'}/>
                                            ) : (
                                                <View style={{width: 22, height: 22}}/>
                                            )
                                        }
                                        <View style={{width: 4}}/>
                                    </View>
                                </TouchableHighlight>
                            }
                            keyExtractor={item => item}
                        />

                        <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3'}}/>
                        
                        <View style={{flexDirection: 'row', padding: 16}}>
                            <View style={{flex: 0.490, margin: 0}}>
                                <TouchableHighlight style={{borderRadius: 8}} underlayColor='#434343' onPress={()=> this.handleCancel()}>
                                    <View style={{justifyContent: 'center', alignItems: 'center',
                                        backgroundColor: '#e5e5e5', borderRadius: 8, height: 42}}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343'}}>Cancel</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={{flex: 0.020}}/>
                            <View style={{flex: 0.490, margin: 0}}>
                                <TouchableHighlight style={{borderRadius: 8}} underlayColor='#434343' onPress={()=> this.handleOK()}>
                                    <View style={{justifyContent: 'center', alignItems: 'center',
                                        backgroundColor: '#eb3b5a', borderRadius: 8, height: 42}}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>OK</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>

                </View>
            </Modal>
        );
    }
}


