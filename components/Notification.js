import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'Mobile-flashcards:notifications'

class Notification extends Component{

    state = {
        notificationData:''
    }
    create = () =>{
        return {
          title: 'Quiz time!',
          body: " don't forget to take a quiz today!",
          data:{test:"👋 don't forget to take a quiz today!"},
          ios: {
            sound: true,
          },
          android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
          }
        }
      }

    

    save = () => {
        
        Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then(status => {
            console.log('Permissions already granted', status)
            if(!status.permissions.notifications.allowsAlert){
                this.requestPermissions()
            }else{
                this.scheduleNotification()
            }
        })                
        .catch((error) => (console.warn('Error getting notification permission: ', error)))
    }

    requestPermissions = () => {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then((status ) => {
            if(status.permissions.notifications.allowsAlert){
                console.log('Permissions granted', status)
                this.scheduleNotification()                        
            }else{
                console.log('Notification permissions denied')
            }
        })
        .catch((error) => (console.log('Error requesting permissions', error)))
    }

    scheduleNotification = () => {
        Notifications.cancelAllScheduledNotificationsAsync()

        let date = new Date()
        date.setDate(date.getDate())
        date.setHours(this.hour)
        date.setMinutes(this.minutes)
        date.setMilliseconds(0)

        Notifications.scheduleLocalNotificationAsync(
            this.create(),
            {
                time: date,
                //repeat: 'day',
            }
        ).then(id => {
            console.log(`Notification set for ${this.hour}:${this.minutes}`)
        })
        .catch(error => (console.log('Error scheduling local notification:', error)))
    }

    display = () => (console.log('Display notification'))
    
    handleNotification = ({data}) => {
        console.info(`Notification received ${JSON.stringify(data)}`)
        this.setState({notificationData:data.test})
    }

    componentDidMount(){
        subscription = Notifications.addListener(this.handleNotification);
        console.log('Subscription ohject', subscription)
    }
    
    render(){
  
        return(
            <View>
                <TextInput placeholder="Hour..." onChangeText={(hour) => this.hour = hour}/>
                <TextInput placeholder="Minutes..." onChangeText={(minutes) => this.minutes = minutes}/>
                <Button title='Save' onPress={this.save}/>
                <Text placeholder='Notification...'>{this.state.notificationData}</Text>
                <Button title='Display notification' onPress={this.display}></Button>
            </View>

        )
    }
}

export default Notification;