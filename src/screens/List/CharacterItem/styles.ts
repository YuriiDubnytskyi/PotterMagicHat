import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  characterList: {
    marginTop: 10,
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  characterDetails: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  characterAttempts: {
    fontSize: 14,
    color: '#666',
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
