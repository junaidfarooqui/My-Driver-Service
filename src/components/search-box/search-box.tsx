import { Component, Prop, State } from '@stencil/core'
import { Store, Action } from '@stencil/redux'
import { postRequest, saveSelectedData } from '../../actions/offers'
import selectedData from './search-box'
import flatpickr from "flatpickr";

@Component({
  tag: 'search-box',
  styleUrl: 'search-box.css'
})

export class SearchBox {

    @Prop({ context: 'store' }) store: Store
    @State() poi: Array<any> = []
    @State() filteredPoi: Array<any> = []
    @State() selectedData: selectedData

    saveSelectedData: Action
    postRequest: Action

    componentWillLoad() {
        const { mapDispatchToProps, mapStateToProps } = this.store

        mapDispatchToProps(this, {
            postRequest,
            saveSelectedData
        });

        mapStateToProps(this, state => ({
            poi: state.poi.poi,
            selectedData: state.offers.selectedData
        }))
    }

    private textInput?: HTMLInputElement;
    private dateTime?: HTMLInputElement;

    componentDidLoad() {
        flatpickr(this.dateTime, {
            enableTime: true,
            dateFormat: "Y-m-dTH:i",
        });
    }

    render() {
        return (
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="row">
                        <div class="col-lg-5">
                            <input placeholder="Type Your Location" class="form-control" onInput={this.handleChange} ref={el => this.textInput = el as HTMLInputElement} onClick={this.makeEmpty} />
                            <ul class="auto-complete bg-light">
                                {this.filteredPoi.map(offer => offer.translations.map(item => {
                                    return item.locale === 'en' && (
                                        <li onClick={() => {this.saveSelectedData({originPlaceId: offer.placeId, address: item.address}), this.sendAddress()}}>
                                            {item.label}, {item.address}
                                        </li>
                                    );
                                }))}
                            </ul>
                        </div>
                        <div class="col-lg-2">
                            <select class="form-control" onChange={this.DurationSelection}>
                                <option> Select Duration</option>
                                <option value="1"> 1 hour</option>
                                <option value="2"> 2 hour</option>
                                <option value="3"> 3 hour</option>
                                <option value="4"> 4 hour</option>
                                <option value="5"> 5 hour</option>
                                <option value="6"> 6 hour</option>
                                <option value="7"> 7 hour</option>
                                <option value="8"> 8 hour</option>
                                <option value="9"> 9 hour</option>
                                <option value="10"> 10 hour</option>
                                <option value="11"> 11 hour</option>
                                <option value="12"> 12 hour</option>
                                <option value="13"> 13 hour</option>
                                <option value="14"> 14 hour</option>
                                <option value="15"> 15 hour</option>
                                <option value="16"> 16 hour</option>
                                <option value="17"> 17 hour</option>
                                <option value="18"> 18 hour</option>
                                <option value="19"> 19 hour</option>
                                <option value="20"> 20 hour</option>
                                <option value="21"> 21 hour</option>
                                <option value="22"> 22 hour</option>
                                <option value="23"> 23 hour</option>
                                <option value="24"> 24 hour</option>
                            </select>
                        </div>
                        <div class="col-lg-3">
                            <input ref={el => this.dateTime = el as HTMLInputElement} class="form-control dt-picker" onChange={this.DateChange} type="text" placeholder="Select Date.." data-id="datetime" readonly="readonly" />
                        </div>
                        <div class="col-lg-2">
                            <button class="btn btn-primary" onClick={this.search}>Search</button>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }

    handleChange = e => {
        this.filteredPoi = this.poi.filter(({ translations }) => {
            return translations.some(({ terms }) => terms.some(term => term.toLowerCase().includes(e.target.value.toLowerCase())))
            }
        )
    };

    DurationSelection = e => {
        const duration = e.target.value * 60;
        this.saveSelectedData({duration: duration})
    };

    DateChange = e => {
        this.saveSelectedData({selectedStartDate: e.target.value + ':00-01:00'}) // it's not clear to me why we have to send seconds and -01-00 with date
    };

    sendAddress = () => {
        this.filteredPoi = [];
        this.textInput.value = this.selectedData.address;
    };

    search = () => {
        const body = {data: {
            selectedStartDate: this.selectedData.selectedStartDate,
            type: "DURATION",
            originPlaceId: this.selectedData.originPlaceId,
            duration: this.selectedData.duration
        }};

        this.postRequest(body);
    };

    makeEmpty = () => {
        this.textInput.value = '';
    };
}