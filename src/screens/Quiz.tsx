import { useEffect, useState } from "react";
import { Text, View ,StyleSheet, Button, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

const Quiz = ({openQuiz,setOpenQuiz}) => {
  
    const [seconds, setSeconds] = useState(30);
    // const currentQuestion=4;
    // const totalQuestions=5;
    const progressWidth = (4 / 5) * 100;
    const navigation = useNavigation();

    useEffect(() => {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
  
      // Clear the interval when component unmounts
      return () => clearInterval(timer);
    }, [seconds]);
    const handlePress = () => {
      // Navigate to the Profile screen
      setOpenQuiz(!openQuiz)
    };  
    return (
      <View style={{padding:20}}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
          <Text style={styles.backSymbol} onPress={handlePress}>{"<"}</Text>
          <Text style={styles.stylingChanges}>Quiz</Text>
          <Text></Text>
        </View>
        <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between",marginBottom:20}}>
          <Text >Q.4/5</Text>
          <Text>{seconds} sec</Text>
        </View>
        <View style={styles.container}>
            <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
          </View>
        <View>
          <Text style={{color:'#03050A',fontSize:14,fontWeight:"600"}}>Q1. What would you do ?</Text>
        </View>
        <View style={{marginTop:450}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
    container: {
      height: 10,
      backgroundColor: '#F5F5F7',
      borderRadius: 5,
      overflow: 'hidden',
      marginBottom:20,
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#C35516',
    },
    stylingChanges:{
      marginBottom:20,
      display:'flex',
      color:"#000000",
      fontSize:14,
      fontWeight:"600"
    },
    backSymbol: {
      fontSize: 20,
      color:'#03050A',
      height:25
    },
  });
export default Quiz;