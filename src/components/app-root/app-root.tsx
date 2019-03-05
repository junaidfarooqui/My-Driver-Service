import '@stencil/router';
import { Component, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import { configureStore } from '../../store/index';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @Prop({ context: 'store' }) store: Store;

  componentWillLoad() {
      this.store.setStore(configureStore({}))
  }

  render() {
    return (
      <div>
        <header class="navbar navbar-expand-lg navbar-dark bg-primary">
          <h1 class="navbar-brand">Limousine Car Service</h1>
            <small class="list-group-item active">made on stencilJs</small>
        </header>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
