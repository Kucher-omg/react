import ProfileStatus from "./ProfileStatus";
import renderer from 'react-test-renderer';
import React from 'react';

const state = {
    editMode: false,
    userStatus: ' '
}
test('test Profile status', () => {
    let component = renderer.create(<ProfileStatus userStatus='ok'/>);
    let instance = component.getInstance();
    expect(instance.state.userStatus).toBe('ok');
});
test('show Input for editing when DoubleClick is ', () => {
    let component = renderer.create(<ProfileStatus userStatus='ok' />);
    let root = component.root;
    let span = root.findByType('span');
    span.props.onClick();
    let input = root.findByType('input');
    expect(input).toBeTruthy();
});
test('input don`t need to be shown', ()=>{
    let component = renderer.create(<ProfileStatus userStatus='ok' />);
    let root = component.root;
    expect(() => { root.findByType('input')}).toThrow();
});
test('if callback work after doubleClick', () => {
    const mockCallBack = jest.fn();
    let component = renderer.create(<ProfileStatus userStatus='ok' updateStatus={mockCallBack} />);
    let instance = component.getInstance();
    instance.UnActiveEditMode();
    expect(mockCallBack.mock.calls.length).toEqual(1);
});