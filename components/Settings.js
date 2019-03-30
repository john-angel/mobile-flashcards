import React, {Component} from 'react'
import {Text,View,Picker,TouchableOpacity} from 'react-native'
import {notificationScheduled,scheduleNotification} from '../utils/storage'

class Settings extends Component {

    state = {
        hour:'12',
        minute:'0',
        period:'AM'
    }

    componentDidMount(){
        let hour = 0;
        
        notificationScheduled()
        .then((notificationObj) => {
            if (notificationObj === null) {
                console.log('Notification not set')
            } else {                
                console.log(`Notification obj: ${JSON.stringify(notificationObj)}`) 
                
                if(notificationObj.period === 'PM'){
                    hour = notificationObj.hour > 12 ? notificationObj.hour - 12 : notificationObj.hour
                }else{
                    hour = notificationObj.hour > 0 ? notificationObj.hour : 12
                }
                
                this.setState({hour:hour.toString(), minute:notificationObj.minute.toString(), period: notificationObj.period})
            }
        })
    }

    done = () => {
        let hour = parseInt(this.state.hour);
        hour = this.state.period === 'AM' ? hour !== 12 ? hour : 0  : hour !== 12 ? hour + 12 : hour
        scheduleNotification(hour,parseInt(this.state.minute))
    }

    render(){
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}> 
                    <Text style={{fontSize:19,paddingTop:52,paddingRight:30,color:'#A85ECC'}}>Reminder</Text>                  
                    <Picker
                        selectedValue={this.state.hour}
                        style={{height:130, width: 50 }}
                        itemStyle={{height:130}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ hour: itemValue })
                        }>
                        <Picker.Item label="12" value="12" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                    </Picker>
                    <Picker
                        selectedValue={this.state.minute}
                        style={{height:130, width: 50 }}
                        itemStyle={{height:130}}                     
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ minute: itemValue })
                        }>
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="20" value="20" />
                        <Picker.Item label="25" value="25" />
                        <Picker.Item label="30" value="30" />
                        <Picker.Item label="35" value="35" />
                        <Picker.Item label="40" value="40" />
                        <Picker.Item label="45" value="45" />
                        <Picker.Item label="50" value="50" />
                        <Picker.Item label="55" value="55" />
                    </Picker>
                    <Picker
                        selectedValue={this.state.period}
                        style={{height:130,width: 50}}
                        itemStyle={{height:130}}                       
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ period: itemValue })
                        }>
                        <Picker.Item label="AM" value="AM" />
                        <Picker.Item label="PM" value="PM" />
                    </Picker>
                </View>
                <TouchableOpacity onPress={this.done}>
                    <Text>Done</Text>
                </TouchableOpacity>

            </View>
                
        )
    }

}

export default Settings;