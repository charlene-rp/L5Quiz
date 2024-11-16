import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';

const quizQuestions = [
  {
    question: 'Who is the protagonist of Omniscient Reader?',
    options: ['Kim Dokja', 'Yoo Joonghyuk', 'Shin Yoosung', 'Lee Hyunsung'],
    correctAnswer: 'Kim Dokja',
    image: 'https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/1/12/Ch.2_illustration.png/revision/latest?cb=20241029213559',
  },
  {
    question: 'What is Yoo Joonghyuk known as?',
    options: ['The Regressor', 'Steel Sword', 'The Young Girl', 'The Narrator'],
    correctAnswer: 'The Regressor',
    image: 'https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/b/bf/Yoo_Joonghyuk_%28Volume_3_cover%29.png/revision/latest/scale-to-width-down/1000?cb=20191022181447',
  },
  {
    question: 'Who is known as the "Steel Sword"?',
    options: ['Lee Hyunsung', 'Kim Dokja', 'Yoo Joonghyuk', 'Shin Yoosung'],
    correctAnswer: 'Lee Hyunsung',
    image: 'https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/7/78/Lee_Hyunsung_Webnovel.png/revision/latest/scale-to-width-down/1000?cb=20220818095712',
  },
  {
    question: 'Shin Yoosung looks up to which character?',
    options: ['Kim Dokja', 'Yoo Joonghyuk', 'Lee Hyunsung', 'None'],
    correctAnswer: 'Kim Dokja',
    image: 'https://static.wikia.nocookie.net/omniscient-readers-viewpoint/images/2/27/Ch.105_illustration.png/revision/latest?cb=20241006004106',
  },
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionPress = (selectedOption) => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      Alert.alert('Correct!', 'Good job!');
    } else {
      Alert.alert('Incorrect!', `The correct answer is: ${currentQuestion.correctAnswer}`);
    }

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizComplete(false);
  };

  return (
      <View style={styles.container}>
        {isQuizComplete ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Quiz Complete!</Text>
              <Text style={styles.scoreText}>Your Score: {score} / {quizQuestions.length}</Text>
              <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
                <Text style={styles.restartButtonText}>Restart Quiz</Text>
              </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.quizContainer}>
              <Image source={{ uri: currentQuestion.image }} style={styles.image} />
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
              {currentQuestion.options.map((option, index) => (
                  <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => handleOptionPress(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
              ))}
            </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    padding: 20,
  },
  quizContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#6c5ce7',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2d3436',
  },
  optionButton: {
    backgroundColor: '#6c5ce7',
    padding: 18,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    transition: '0.3s',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2d3436',
  },
  scoreText: {
    fontSize: 22,
    marginBottom: 20,
    color: '#2d3436',
  },
  restartButton: {
    backgroundColor: '#00cec9',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#00b894',
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

