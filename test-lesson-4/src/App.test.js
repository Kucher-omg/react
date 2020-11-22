
test('Add post, will be 3', () => {
  let action = addPost();
  const state = {
      posts: [
          { id: 1, message: "post1", like: 0 },
          { id: 2, message: "post2", like: 2 }
      ],
      newPostText: 'post3'
  }
  let newState = ProfilePage(state, action);
  expect(newState.posts.length).toBe(3);
});

test('Add message text', () => {
  let action = updateMessageText('hello');
  expect(action.newMessageText).toBe('hello');
});