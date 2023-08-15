<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            ClientTypeSeeder::class,
            ClientSeeder::class,
            CaseTypeSeeder::class,
            LawsuitCaseSeeder::class,
            CourtSeeder::class,
            CaseStageSeeder::class,
            LawsuiteSeeder::class,
            OpponentSeeder::class,
            CaseSessionSeeder::class,
            ConsultationSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
