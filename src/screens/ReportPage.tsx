import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Button from '../common/Button';
import CustomText from '../common/CustomText';
import {Image} from 'react-native';
import imageGif from '../assets/image.gif';
import {useEffect} from 'react';
import {UpdateReport} from '../services/quizServices';
import {useSelector} from 'react-redux';
import {AuthState} from '../interfaces/autInterfaces';

interface IProps {
  setOpenQuiz: any;
  openQuiz: any;
  totalQuestions: any;
  score: any;
  quizType: any;
  dynamicHeight: any;
  quizId:any;
}
const ReportPage = (props:any) => {
  const{score,quizId,quizType,totalQuestions}=props.route.params
  
  const details = useSelector((state: AuthState) => state?.auth);
  const handlePress = () => {
    props.navigation.navigate("HomeScreen")
  };
  const userId = details?.user?.id;
  useEffect(() => {
    UpdateReport({score, quizId, userId});
  },[score,quizType,userId]);
  return (
    <View style={{padding: 20}}>
      <View style={{maxHeight: '100%', height: '94%'}}>
        <CustomText
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'Montserrat',
            marginBottom: 20,
            color:'#000000'
          }}
          text="Result"
        />
        <View
          style={{
            backgroundColor: '#F8F8F8',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <CustomText
            style={{
              textAlign: 'center',
              marginBottom: 10,
              fontSize: 12,
              fontWeight: 500,
              color:'#03050A'
            }}
            text="Your Final Score Is"
          />
          <Text
            style={{
              fontSize: 32,
              fontWeight: '600',
              marginBottom: 10,
              color: '#FF7520',
            }}>
            {score}/{totalQuestions}
          </Text>
          <CustomText
            style={{
              textAlign: 'center',
              marginBottom: 10,
              fontSize: 12,
              fontWeight: 400,
              color:'#03050A'
            }}
            text={`${score} correct answers out of total ${totalQuestions} questions.`}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              source={imageGif}
              style={{width: '100%', height: 300, marginLeft: -100}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Image
              source={imageGif}
              style={{
                width: '100%',
                height: 300,
                transform: [{scaleX: -1}],
                marginRight: 90,
              }}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <Button style={{borderRadius: 10}} title="Finish" onPress={handlePress} />
    </View>
  );
};
export default ReportPage;
