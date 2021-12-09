import React, {ReactNode} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/store';
import Loading from './Loading';

interface Props extends PropsFromRedux {
  children: ReactNode;
}

const LoadingScreenWrapper = (props: Props) => (
  <>
    {props.children}
    {props.loadingCount && props.loadingCount > 0 ? <Loading /> : null}
  </>
);

const mapState = (state: RootState) => ({
  loadingCount: state.general.loadingCount,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoadingScreenWrapper);
