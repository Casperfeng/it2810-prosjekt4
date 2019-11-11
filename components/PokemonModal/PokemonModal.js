import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { closeModal } from '../../redux/ducks/modalDuck';
import { colorFromType } from '../../common/constants';

function PokemonModal() {
  const dispatch = useDispatch();
  const modalInfo = useSelector(state => state.modalInfo);
  let modal = <View></View>;
  /**
   * Returns the id formatted as three digits.
   */
  function formattedID() {
    const id = modalInfo.id;
    let toReturn = '';
    if (id < 100) toReturn += '0';
    if (id < 10) toReturn += '0';
    return toReturn + id;
  }

  /**
   * * Returns the type with the corresponding index. If no type exists, return an empty string;
   */
  function type(index) {
    const types = modalInfo.types;
    if (index >= types.length) return '';
    return types[index];
  }

  if (modalInfo.show) {
    modal = (
      <View style={styles.modal}>
        <View style={styles.modalheader}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../../assets/favorite_icon_off.png')}
          ></Image>
          <Text style={{ fontSize: 20 }}>#{formattedID()}</Text>
          <TouchableHighlight onPress={() => dispatch(closeModal())}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/close_button.png')}
            ></Image>
          </TouchableHighlight>
        </View>
        <Text style={styles.modalText}>{modalInfo.name}</Text>
        <View style={styles.modalContainer}>
          <Image
            style={styles.modalImage}
            source={{
              uri:
                'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
                formattedID() +
                '.png'
            }}
            alt={modalInfo.name}
          />
          <View style={styles.modalTypes}>
            <Text style={styles.typeHeader}>Types</Text>
            <Text
              style={{
                ...styles.typeText,
                backgroundColor: colorFromType[type(0)]
              }}
            >
              {type(0)}
            </Text>
            {type(1) != '' && (
              <Text
                style={{
                  ...styles.typeText,
                  backgroundColor: colorFromType[type(1)]
                }}
              >
                {type(1)}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.modalStats}></View>
      </View>
    );
  }

  return <>{modal}</>;
}
const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  modalheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: -20
  },
  viewsContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  modalText: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
    textTransform: 'capitalize'
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  modalImage: {
    width: '50%',
    aspectRatio: 1
  },
  modalTypes: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: 10
  },
  typeHeader: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: 20
  },
  typeText: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    color: 'white',
    textTransform: 'capitalize'
  },
  modalStats: {
    borderRadius: 5,
    backgroundColor: '#3498db',
    color: 'white',
    height: '50%'
  }
});

export default PokemonModal;
