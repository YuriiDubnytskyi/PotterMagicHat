import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  countContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  successContainer: {
    padding: 10,
    backgroundColor: '#d4edda',
    borderRadius: 8,
    marginTop: 50,
  },
  successText: {
    color: '#155724',
    fontSize: 16,
    textAlign: 'center',
  },
});
