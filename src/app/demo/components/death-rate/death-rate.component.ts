import { Component, OnInit } from '@angular/core';
import { PondService } from '../../service/pond.service';
import { Pond } from '../../api/pond';

@Component({
    selector: 'app-death-rate',
    templateUrl: './death-rate.component.html',
    styleUrl: './death-rate.component.scss',
})
export class DeathRateComponent implements OnInit {
    ponds:Pond[];
    constructor(private PondService:PondService) {
        
    }
    
    ngOnInit() {
        this.getponds();
    }
    getponds() {
        this.PondService.getPond().subscribe((data) => {
            this.ponds = data.results;
        })
    }
}
