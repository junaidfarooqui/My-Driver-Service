import { Component, Element, Prop, State } from '@stencil/core';
import { Store, Action } from "@stencil/redux";
import { getPoi } from '../../actions/poi'

@Component({
  tag: 'app-home',
})
export class AppHome {
    @Element() el: HTMLElement;

    @Prop({ context: 'store' }) store: Store;
    @State() offers: Array<any>;

    getPoi: Action

    componentWillLoad() {
        const { mapStateToProps, mapDispatchToProps } = this.store;

        mapStateToProps(this, state => {
            return {
                offers: state.offers.items
            }
        })

        mapDispatchToProps(this, {
            getPoi
        })

        this.getPoi();
    }

  render() {
    return (
      <div>
          <h4 class="text-center mb-4 mt-4">Welcome to Car Section, you can find best car here. Please type you selected date.</h4>
          <search-box></search-box>
          <offers-list></offers-list>
      </div>
    );
  }
}
