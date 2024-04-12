import React from 'react';
import { Button, Text, TouchableOpacity, View ,StyleSheet} from 'react-native';

const Play = ({route}) => {
  const { openQuiz, setOpenQuiz } = route.params;
  // const  setOpenQuiz  = props?.params?.setOpenQuiz;
    console.log(openQuiz,'openQuizfjfaufbuwef');
    
    const handleSubmit=()=>{
      setOpenQuiz(!openQuiz)
    }
  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.top}>PLAY</Text>
        </View>
        <View style={{padding:20}}>
        <View style={{ borderWidth: 1, borderColor: '#D4D4D4', borderRadius: 12, padding: 10, marginBottom: 20,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.text}>Game -1 Quiz</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
        </View>
        {/* Second Box */}
        <View style={{ borderWidth: 1, borderColor: '#D4D4D4', borderRadius: 12, padding: 10 ,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.text}>Game -2 Pattern Identifier</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#3A2D7D',
      width:320,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    text:{
        justifyContent:'center',
        alignItems: 'center',
        marginBottom:50
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        fontSize: 14,
        fontWeight: '600',
        paddingTop:30
    },
  });

export default Play;
