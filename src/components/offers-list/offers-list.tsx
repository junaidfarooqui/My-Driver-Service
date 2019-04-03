import { Component, State, Prop } from '@stencil/core'
import { Store } from '@stencil/redux'

@Component({
    tag: 'offers-list'
})
export class OffersList {
    @Prop({ context: 'store' }) store: Store
    @State() items: Array<any> = []
    @State() loading: Boolean = false
    @State() fetchError: string

    componentWillLoad() {
        const { mapStateToProps } = this.store
        mapStateToProps(this, state => {
            return {
                items: state.offers.items,
                loading: state.offers.loading,
                fetchError: state.offers.fetchError,
            }
        })
    }

    render() {

        const { items, fetchError, loading } = this;
        if (loading || fetchError) {
            return (
                <div class="container mt-lg-5 text-center">
                    {fetchError && <div class="text-danger mb-4">{fetchError}</div>}
                    {loading && (
                        <div class="loading">.</div>
                    )}
                </div>
            )
        }
        else {
            return (
                <div class="container mt-lg-5">
                    <div class="row">
                        {items.map(offer => {
                            return (
                                <div class="col col-4 mb-3">
                                    <div class="card mb-2">
                                        <h4 class="card-header">{offer.vehicleType.title}</h4>
                                        <div class="card-body">
                                            <h6 class="card-subtitle text-muted mb-3">Passengers: {offer.vehicleType.nrOfPassengers} </h6>
                                            <h6 class="card-subtitle text-muted">Baggage: {offer.vehicleType.nrOfBaggage} </h6>
                                        </div>
                                        <img src={offer.vehicleType.images.mdpi} alt="Card image" />
                                            <div class="card-body">
                                                <small class="text-muted">{offer.vehicleType.description}</small>
                                                <h5 class="mt-2">Benefits:</h5>
                                                <ul class="benefits">
                                                    {offer.vehicleType.benefits.map(item => {
                                                      return  <li>{item}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        <div class="card-footer text-lg-right price">
                                            {offer.currency} {(offer.amount/100).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
}