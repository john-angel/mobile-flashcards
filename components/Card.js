import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { addAnswerSelected } from '../actions/questions'
import {getDeck, saveOption} from '../utils/storage'
import { AntDesign } from '@expo/vector-icons'
import { white,blue,red,pink,green} from '../utils/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



class Card extends Component{

    state = {
        question:'',
        answer:'',
        showAnswer: false,
        disableContinue:true
    }
    viewabilityConfig = {
        itemVisiblePercentThreshold: 100
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

        saveOption(deckId,questionId,'correct')
        .then((option) => {
            this.props.dispatch(addAnswerSelected(deckId,questionId,option))
            this.setState({disableContinue:false})
        })
    }

    onIncorrect = () => {
        const {deckId, questionId} = this.props

        saveOption(deckId,questionId,'inCorrect')
        .then((option) => {
            this.props.dispatch(addAnswerSelected(deckId,questionId,option))
            this.setState({disableContinue:false})
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
            const { isViewable, key } = item;
            console.log('viewableItems-isViewable:', isViewable)
            switch(key){
                case 'false':
                    console.log('viewableItems-False option selected')
                    this.onIncorrect()
                    break;
                    case 'true':
                    console.log('viewableItems-True option selected')
                    this.onCorrect()
                    break;
            }
        })
        changed.forEach((item) => {
            const { isViewable, key } = item;
            console.log('changed-isViewable:', isViewable)
            switch(key){
                case 'false':
                    console.log('changed-False option selected')
                    this.onIncorrect()
                    break;
                    case 'true':
                    console.log('changed-True option selected')
                    this.onCorrect()
                    break;
            }
        })
        
        
    }
    
    
    render(){
//#0EB252
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        })

        const rotateYStyle = {
            transform: [{ rotateY: spin }]
        }

        
        return(
            <View style={styles.container}>
                   
              
                <Animated.View style={[rotateYStyle,styles.card]}>
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
                            <FlatList ref={el => this.list = el} 
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
                                    <View style={{ width: this.listItemWidth, backgroundColor:red, height:30,marginTop:'20%',alignItems:'center'}} id={'false'}>
                                        <AntDesign style={{color:white}} name={'close'}  size={29} />
                                    </View>},
                                    {key:'answer',data:
                                    <View style={{ width: this.listItemWidth, height:30,marginTop:'20%',flexDirection: 'row', justifyContent:'space-between'}} id={'answer'}>
                                        <MaterialCommunityIcons style={{color:red}} size={29}  name={'chevron-double-left'}/>
                                        <Text style={styles.text}>{this.state.answer}</Text>
                                        <MaterialCommunityIcons style={{color:green}} size={29}  name={'chevron-double-right'}/>                                                                        
                                    </View>
                                    },
                                    {key:'true',data:
                                    <View style={{ width: this.listItemWidth, backgroundColor:green, height:30,marginTop:'20%',alignItems:'center'}}  id={'true'}>
                                        <AntDesign style={{color:white}} name={'check'}  size={29} />
                                    </View>
                                    }]}
                                    renderItem={({ item }) => item.data}
                            />                          
                            <View>  
                                <Text style={{ textAlign: 'center', marginTop: '20%' }}>{this.props.questionId + 1} / {this.questionsLength}</Text>
                                {
                                    this.questionsLength === this.props.questionId + 1 ?
                                    (
                                        <TouchableOpacity disabled={this.state.disableContinue} onPress={this.onResult}>
                                            <Text style={styles.resultsText}>Result</Text>
                                        </TouchableOpacity>
                                    )
                                    :
                                    (  
                                        <TouchableOpacity disabled={this.state.disableContinue}  onPress={this.next}>                                             
                                            <AntDesign style={{color:blue, textAlign: 'right',marginTop: '15%'}} name={'right'}  size={29} />                                            
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
    card: {   /*     
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#A85ECC',
        width: '90%',
        height: '50%'   */     
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
        fontWeight:'bold',
        marginTop: '15%'
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