import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { addAnswerSelected } from '../actions/questions'
import {getDeck, saveOption} from '../utils/storage'
import { AntDesign,FontAwesome } from '@expo/vector-icons'
import { white,blue,red,green,gray} from '../utils/colors'

class Card extends Component{

    state = {
        question:'',
        answer:'',
        showAnswer: false,
        disableContinue:true,
        resultColor:gray
    }
    viewabilityConfig = {
        itemVisiblePercentThreshold: 90,
        waitForInteraction:true
      };

    constructor(){ 
        super();
        this.spinValue = new Animated.Value(0);
        this.value = 0;
        this.listItemWidth = Dimensions.get('window').width;
        

        this.spinValue.addListener(({ value }) => {
            this.value = value;
        })
    }

    componentDidMount(){
        const {deckId, questionId} = this.props
        
        getDeck(deckId).then((deck) => {
            this.questionsLength = deck.questions.length

            let question = deck.questions[questionId].question
            let answer = deck.questions[questionId].answer
            
            this.setState({
                question:question,
                answer:answer
            })
        })
        
    }

    next = () => {
        nextQuestion = this.props.navigation.push('Card',{
                id:this.props.deckId,
                question:this.props.questionId + 1
            }
        )
    }

    onCorrect = () => {     
        const {deckId, questionId} = this.props
        console.log('onCorrect selected');
        saveOption(deckId,questionId,'correct')
        .then((option) => {
            this.props.dispatch(addAnswerSelected(deckId,questionId,option))
            this.setState({disableContinue:false,resultColor:blue})
        })
    }

    onIncorrect = () => {
        const {deckId, questionId} = this.props
        console.log('Incorrect selected');
        saveOption(deckId,questionId,'inCorrect')
        .then((option) => {
            this.props.dispatch(addAnswerSelected(deckId,questionId,option))
            this.setState({disableContinue:false,resultColor:blue})
        })
    }

    onShowAnswer = () => {

        Animated.timing(
            this.spinValue,
            {
                toValue: !this.value,
                duration: 1000,
                easing: Easing.linear
            }
        ).start(() => {

            this.setState({showAnswer:true})

            Animated.timing(
                this.spinValue,
                {
                    toValue: !this.value,
                    duration: 1000,
                    easing: Easing.linear
                }
            ).start(() => {

            })
        })
       
    }
    onResult = () => this.props.navigation.push('Result',{id:this.props.deckId}) 

    onViewableItemsChanged = ({viewableItems,changed}) => {        

        viewableItems.forEach((item) => {
            const { key } = item;
            switch(key){
                case 'false':
                    this.onIncorrect()
                    break;
                case 'true':
                    this.onCorrect()
                    break;
            }
        })
        changed.forEach((item) => {
            const { key } = item;
            switch(key){
                case 'false':
                    this.onIncorrect()
                    break;
                case 'true':
                    this.onCorrect()
                    break;
            }
        })

    }
    
    
    render(){

        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        })

        const rotateYStyle = {
            transform: [{ rotateY: spin }]
        }

        
        return(
            <View style={styles.container}>
                   
              
                <Animated.View style={rotateYStyle}>
                {
                    this.state.showAnswer === false ? (
                        <View>
                            <Text style={[styles.text,{marginTop:'20%'}]}>{this.state.question}</Text>
                            <TouchableOpacity style={styles.answerButton}  onPress={this.onShowAnswer}>
                                <Text style={styles.answerButtonText}>Answer</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    : (
                        <View>
                            <FlatList style={{marginTop:'20%'}} ref={el => this.list = el} 
                             getItemLayout={(data, index) => (
                                {length: this.listItemWidth, offset: this.listItemWidth * index, index}
                                )}
                            initialScrollIndex={1}
                            onViewableItemsChanged={this.onViewableItemsChanged }
                            viewabilityConfig={this.viewabilityConfig}
                            onScrollEndDrag={this.onScrollEndDrag}
                            horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} 
                                centerContent={true} onScrollToIndexFailed={()=>{}} 
                                data={[{key:'false',data:
                                    <View style={{ width: this.listItemWidth, backgroundColor:red, height:33,alignItems:'center'}} id={'false'}>
                                        <AntDesign style={{color:white}} name={'close'}  size={29} />
                                    </View>},
                                    {key:'answer',data:
                                    <View style={{ width: this.listItemWidth, height:36,flexDirection: 'row', justifyContent:'space-between'}} id={'answer'}>
                                        <FontAwesome style={{color:green}} size={35}  name={'long-arrow-left'}/>
                                        <Text style={styles.text}>{this.state.answer}</Text>
                                        <FontAwesome style={{color:red}} size={35}  name={'long-arrow-right'}/>                                                                        
                                    </View>
                                    },
                                    {key:'true',data:
                                    <View style={{ width: this.listItemWidth, backgroundColor:green, height:33,alignItems:'center'}}  id={'true'}>
                                        <AntDesign style={{color:white}} name={'check'}  size={29} />
                                    </View>
                                    }]}
                                    renderItem={({ item }) => item.data}
                            />                          
                            <View>  
                                <Text style={{ textAlign: 'center'}}>{this.props.questionId + 1} / {this.questionsLength}</Text>
                                {
                                    this.questionsLength === this.props.questionId + 1 ?
                                    (
                                        <TouchableOpacity disabled={this.state.disableContinue} onPress={this.onResult}>
                                            <Text style={[styles.resultsText,{color:this.state.resultColor}]}>Result</Text>
                                        </TouchableOpacity>
                                    )
                                    :
                                    (  
                                        <TouchableOpacity disabled={this.state.disableContinue}  onPress={this.next}>                                             
                                            <AntDesign style={{color:this.state.resultColor, textAlign: 'right'}} name={'right'}  size={29} />                                            
                                        </TouchableOpacity> 
                                    )
                                }
                            </View>
                                                                  
                        </View>                                                   
                    )       
                }
                </Animated.View>
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'     
    },
    text:{
        fontSize:19,
        textAlign:'center'
       
    },
    answerButton:{
        backgroundColor:'#76617F',
        borderRadius: 6,
        marginTop:'20%',
        marginRight:'30%',
        marginLeft:'30%'       
    },
    answerButtonText:{
        color:white,
        fontWeight:'bold',
        fontSize: 20,        
        textAlign:'center',
        paddingTop:5,
        paddingBottom:5
    },
    resultsText:{
        color: '#76617F',
        textAlign: 'center',
        fontSize:19,
        fontWeight:'bold'
    }   
});


function mapStateToProps(state,props) {
    
    const deckId = props.navigation.getParam('id', '0')
    const questionId = props.navigation.getParam('question', '0')   

    return{
        deckId,
        questionId
    }
}

export default connect(mapStateToProps)(Card);